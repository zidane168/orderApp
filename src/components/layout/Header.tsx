'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link' 
import Log from '../../ultis/log'

export default function Header() {
    const session = useSession()  
    Log( {content: session} )

    const status = session.status 
    const userData = session?.data?.user
    let  userName  = userData?.name || userData?.email 
    let firstName = "";
    if (userName && userName.includes('')) {
        firstName = userName.split(' ')[0];
    }
    
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
                            <Link  href={'/profile'} > Hello, { firstName } </Link>
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