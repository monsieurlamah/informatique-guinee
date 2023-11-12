import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useContext, useCallback, useEffect, useState } from "react";
import {toast} from 'react-hot-toast'

type CartContextType = {
    cartTotalQty : number;
    cartTotalAmount: number
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product:CartProductType) => void;
    handleRemoveProductFromCart: (product:CartProductType) => void;
    handleCartQtyIncrease: (product:CartProductType) => void;
    handleCartQtyDecrease: (product:CartProductType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props : Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);

    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);


    console.log('qty', cartTotalQty);
    console.log('amount', cartTotalAmount);
    

    useEffect(()=>{
        const cartItems: any = localStorage.getItem('iGCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    }, [])

    useEffect(()=>{
        const getTotals = ()=>{
            if (cartProducts) {
                const {total, qty} = cartProducts?.reduce((acc, item)=>{
                    const itemTotal = item.price * item.quantity
    
                    acc.total += itemTotal
                    acc.qty += item.quantity
    
                    return acc
    
                },{
                    total: 0,
                    qty: 0,
                }
                );
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
        };

        getTotals()
    }, [cartProducts])
    
//add to card method
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev)=>{
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product];
            }else{
                updatedCart = [product];
            }
             
            localStorage.setItem('iGCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    //remove one product from cart method
    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    )=>{
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item)=>{
                return item.id !== product.id
            })

            setCartProducts(filteredProducts)
            toast.success('Produit supprimé');
            localStorage.setItem('iGCartItems', JSON.stringify(filteredProducts));

        }
    }, [cartProducts])

 //increment the product quantity in the cart method
    const handleCartQtyIncrease = useCallback((
        product: CartProductType
    )=>{
        let updatedCart;
        
        if (product.quantity === 99) {
            return toast.error("Oups ! Maximum atteint")
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item)=> item.id === product.id);

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('iGCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

 //decrement the product quantity in the cart method
 const handleCartQtyDecrease = useCallback((
    product: CartProductType
)=>{
    let updatedCart;
    
    if (product.quantity === 1) {
        return toast.error("Oups ! Minimum atteint")
    }

    if (cartProducts) {
        updatedCart = [...cartProducts]

        const existingIndex = cartProducts.findIndex((item)=> item.id === product.id);

        if (existingIndex > -1) {
            updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
        }

        setCartProducts(updatedCart)
        localStorage.setItem('iGCartItems', JSON.stringify(updatedCart))
    }
}, [cartProducts])


    // clear cart method
    const handleClearCart = useCallback(()=>{
        setCartProducts(null)
        setCartTotalQty(0)
        toast.success('Vous avez vidé le panier')
        localStorage.setItem('iGCartItems', JSON.stringify(null))
    }, 
    [cartProducts])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,

    }

    return <CartContext.Provider value={value} {...props}/>;

};

export const useCart = () =>{
    const context = useContext(CartContext);

    if(context === null){
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
};