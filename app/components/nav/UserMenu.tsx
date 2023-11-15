"use client"

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserMenuProps{
    currentUser: SafeUser | null
}
const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen(prev => !prev)
    }, [])

    const router = useRouter()


    // console.log("user<<<",currentUser);

    return ( 
    <>
    <div className="relative z-30">
        <div onClick={toggleOpen} className="
        p-2
        border-[1px]
        border-slate-400
        flex
        flex-row
        items-center
        gap-1
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        text-slate-700
        ">
            <Avatar src={currentUser?.image}/>
            <AiFillCaretDown/>
        </div>
        {isOpen && (
            <div className="
            absolute
            rounded-md
            w-[170px]
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            flex
            flex-col
            cursor-pointer
            ">
            {currentUser ? 
                <div>
                    <Link href="/orders">
                        <MenuItem onClick={toggleOpen}>
                             Vos commandes
                        </MenuItem>
                    </Link>
                    <Link href="/admin">
                        <MenuItem onClick={toggleOpen}>
                            Admin Dashboard
                        </MenuItem>
                    </Link>
                    <hr />
                    <MenuItem onClick={()=>{
                        toggleOpen();
                        signOut();
                        router.push('/login')
                        router.refresh();
                        toast.success('Vous êtes déconnecté'); 
                    }}>
                        Se déconnecter
                    </MenuItem>
                </div>
                :
                <div>
                    <Link href="/login ">
                        <MenuItem onClick={toggleOpen}>
                        Se connecter
                        </MenuItem>
                    </Link>
                    <Link href="/register">
                        <MenuItem onClick={toggleOpen}>
                             S'inscrire
                        </MenuItem>
                    </Link>
                </div>
            } 
            </div>
        )}
    </div> 
    {isOpen ? <BackDrop onClick={toggleOpen }/> : null }
    </>
    
    );
};
 
export default UserMenu;