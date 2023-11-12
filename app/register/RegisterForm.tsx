"use client"
import {useEffect, useState} from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps{
    currentUser: SafeUser | null
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            name:"",
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
        
        axios.post('/api/register', data).then(()=>{
            toast.success('Compte créé')

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback)=>{
                if(callback?.ok){
                    router.push('/cart')
                    router.refresh();
                    toast.success('Connecté');
                }

                if(callback?.error){
                    toast.error(callback.error);
                }
            });
        }).catch(() => toast.error("Quelque chose s'est mal passé")).finally(()=>{
            setIsLoading(false)
        });

        
    };

    if (currentUser) {
        return <p className="text-center">Connecté Redirection...</p>
    }

    return ( 
        <>
        <Heading title="Inscrivez-vous à Informatique Guinée"/>
        <Button 
        outline 
        label="Inscrivez-vous avec Google"
        icon={AiOutlineGoogle}
        onClick={()=>{}}
        />
        <hr className="bg-slate-300 w-full h-px"/>
        <Input
        id="name"
        label="Nom"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
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
        <Button label={isLoading ? "Chargement" : "S'inscrire"} onClick={handleSubmit(onSubmit)}/>
        <p className="text-sm">
            Vous avez déjà un compte ? <Link className="underline" href={'/login'}>Se connecter</Link>
        </p>
        </>
     );
}
 
export default RegisterForm;