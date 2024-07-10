'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'  
import { useEffect, useState } from 'react' 
import { memberApi } from "@/app/api/members/member.api"; 
import { useSessionData } from '@/customHook/useSessionData'


export default function Header() {
    const session = useSession()   
    const status = session.status 

    const [ firstName, setFirstName ] = useState('')  


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
        <header className="flex items-center justify-between"> 
            <nav className="flex items-center gap-8 font-semibold text-gray-500" >
                <Link className="text-2xl font-semibold text-primary" href={'/'}> ST PIZZA </Link>
                <Link href={'/'}> Home </Link>
                <Link href={''}> Menu </Link>
                <Link href={''}> About </Link>
                <Link href={''}> Contact </Link> 
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
            </nav>
        </header>
    )
}