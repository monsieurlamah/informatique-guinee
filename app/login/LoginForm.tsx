"use client"
import {useEffect, useState} from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            email:"",
            password:"",
        },
    });


    const router = useRouter()


    useEffect(()=>{
        if(currentUser){
            router.push('/cart');
            router.refresh();
        }
    }, []);

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        
        signIn('credentials', {
            ...data, 
            redirect: false
        }).then((callback)=>{
            setIsLoading(false)

            if(callback?.ok){
                router.push('/cart')
                router.refresh();
                toast.success('Connecté');
            }

            if(callback?.error){
                toast.error(callback.error);
            };
        });

        
    };

    if (currentUser) {
        return <p className="text-center">Connecté Redirection...</p>
    }



    return ( 
        <>
        <Heading title="Connectez-vous à Informatique Guinée"/>
        <Button 
        outline 
        label="Continuer avec Google"
        icon={AiOutlineGoogle}
        onClick={()=>{}}
        />
        <hr className="bg-slate-300 w-full h-px"/>
         <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="email"
        />
         <Input
        id="password"
        label="Mot de passe"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        />
        <Button label={isLoading ? "Chargement" : "Se connecter"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">
            Vous n'avez pas de compte ? <Link className="underline" href={'/register'}>S'inscrire</Link>
        </p>
        </>
     );
}
 
export default LoginForm;