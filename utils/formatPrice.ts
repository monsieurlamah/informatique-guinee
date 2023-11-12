export const formatPrice = (amount:number) =>{
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency:'GNF',
    }).format(amount);
};