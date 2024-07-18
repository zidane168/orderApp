'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'  
import { useContext, useEffect, useState } from 'react' 
import { memberApi } from "@/app/api/members/member.api"; 
import { useSessionData } from '@/customHook/useSessionData'
import { CartContext } from '../AppContext';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';


export default function Header() {
    const session = useSession()   
    const status = session.status 

    const [ firstName, setFirstName ] = useState('')  
    const { cartProducts } = useContext(CartContext)

    useEffect(() => {  
        const fetchData = async () => {
            try {
                const session = await useSessionData()      // must use await this for make asynchoronous and useSessionData is get from a hook 
              
                if (session) {  
                    const { getProfile } = memberApi();
                    const res = await getProfile();  

                    if (res?.status === 200 && res?.data?.status === 200) {
                        const userData = res.data.params;
                        const userName = userData?.name || userData?.email; 
                        session.user = userData
        
                        if (userName) {
                            setFirstName(userName.split(' ')[0]);
                        }
                    }  
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }; 
        fetchData();
    }, [ session ])
    
    return (
        <header className="flex items-center justify-between w-full mt-4"> 
            <nav className="flex items-center gap-8 font-semibold text-gray-500" >
                <Link className="text-2xl font-semibold text-primary" href={'/'}> ST PIZZA </Link>
                <Link href={'/'}> Home </Link>
                <Link href={'/menu'}> Menu </Link>
                <Link href={'/#about'}> About </Link>
                <Link href={'/#contact'}> Contact </Link> 
            </nav>

            <nav className="flex items-center gap-4 font-semibold text-gray-500">
                {status == 'authenticated' && (
                    <>
                        <div className='w-[150px]'>  
                            <Link  href={'/profile'} > Hello,  { firstName } </Link>  
                        </div>
                        <button
                            onClick={() => signOut()}
                            className='text-white rounded-full bg-primary'
                        >Logout </button> 
                    </>
                )}
                {status == 'unauthenticated' && (
                    <>
                        <Link href={'/login'}> Login </Link>
                        <Link href={'/register'} className = "px-4 py-2 text-white rounded-full bg-primary">  Register </Link> 
                    </> 
                )} 

                
                <Link href={'/cart'}> 
                    <div className="relative">
                        <ShoppingCartIcon className={'w-8 h-8'}/> 
                        <div className="absolute top-[-25px] right-[-5px] text-white font-semibold bg-primary p-1 rounded-full"> 
                            {cartProducts.length} 
                        </div> 
                    </div>
                </Link>  
            </nav>
        </header>
    )
}