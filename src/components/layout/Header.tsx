'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link' 

export default function Header() {
    const session = useSession()
    console.log(session)

    const userData = session?.data?.user
    const userName  = userData?.name || userData?.email 
    const status = session.status
    
    return (
        <header className="flex items-center justify-between"> 
            <nav className="flex gap-8 text-gray-500 font-semibold items-center" >
                <Link className="text-primary font-semibold text-2xl" href={'/'}> ST PIZZA </Link>
                <Link href={'/'}> Home </Link>
                <Link href={''}> Menu </Link>
                <Link href={''}> About </Link>
                <Link href={''}> Contact </Link>
               
            </nav>

            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                {status == 'authenticated' && (
                    <>
                        <Link href={'/profile'}> { userName } </Link>
                        <button
                            onClick={() => signOut()}
                            className='bg-primary rounded-full text-white'
                        >Logout </button> 
                    </>
                )}
                {status == 'unauthenticated' && (
                    <>
                        <Link href={'/login'}> Login </Link>
                        <Link href={'/register'} className = "bg-primary text-white px-4 py-2 rounded-full"> Register </Link> 
                    </>
                   
                )}
               
                
            </nav>
        </header>
    )
}