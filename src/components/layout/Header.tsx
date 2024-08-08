'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'  
import { useContext, useEffect, useState } from 'react' 
import { memberApi } from "@/app/[locale]/api/members/member.api"; 
import { useSessionData } from '@/customHook/useSessionData'
import { CardContextType, CartContext } from '../AppContext';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import LocaleSwitcher from '../LocaleSwithcher';
import { useTranslations } from 'next-intl'; 


export default function Header() {
    const session = useSession()   
    const status = session.status 
    const t = useTranslations('HomePage');
    const tc = useTranslations("CommonPage")
    const tl = useTranslations('LoginPage');
    const tr = useTranslations("RegisterPage") 

    const [ firstName, setFirstName ] = useState('')  
    const { cartProducts, showCarts } = useContext(CartContext) as CardContextType

    useEffect(() => {  
        const fetchData = async () => {
            try {
                const session = await useSessionData()      // must use await this for make asynchronous and useSessionData is get from a hook 
              
                if (session) {  
                    const { getProfile } = memberApi();
                    const res = await getProfile();  

                    if (res?.status === 200 && res?.data?.status === 200) {

                        await showCarts();  // show cart item number
                        
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
        <>
            <LocaleSwitcher />

            <hr />
            <header className="flex items-center justify-between w-full mt-4"> 
                <nav className="flex items-center gap-8 font-semibold text-gray-500" >
                    <Link className="text-2xl font-semibold text-primary" href={'/'}> ST PIZZA </Link>
                    <Link href={'/'}> { t('home') } </Link>
                    <Link href={'/menu'}> { t('menu') } </Link>
                    <Link href={'/#about'}> { t('about') } </Link>
                    <Link href={'/#contact'}> { t('contact') } </Link> 
                </nav>

                <nav className="flex items-center gap-4 font-semibold text-gray-500">
                    {status == 'authenticated' && (
                        <>
                            <div className='w-[200px]'>  
                                <Link  href={'/profile'} > { tc('hello') },  { firstName } </Link>  
                            </div>
                            <button
                                onClick={() => signOut()}
                                className='text-white rounded-full bg-primary'
                            >{ tc('logout') } </button> 
                        </>
                    )}
                    {status == 'unauthenticated' && (
                        <>
                            <Link href={'/login'}> { tl('login') } </Link>
                            <Link href={'/register'} className = "px-4 py-2 text-white rounded-full bg-primary">  { tr('register') } </Link> 
                        </> 
                    )} 
                    
                    <Link href={'/cart'}> 
                        <div className="relative">
                            <ShoppingCartIcon className={'w-8 h-8'}/> 
                            <div className="absolute top-[-15px] right-[-5px] text-white font-semibold bg-primary p-1 leading-3 rounded-full"> 
                                {cartProducts.length > 99 ? '99+' : cartProducts.length} 
                            </div> 
                        </div>
                    </Link>  
                </nav>
            </header>
        </>
    )
}