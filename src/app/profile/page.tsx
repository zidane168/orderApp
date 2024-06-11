'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const session = useSession(); 
    const userEmail = session.data?.user?.email || '';
    const userImage = session.data?.user?.image || '';
 
    const [ userName, setUserName ] = useState(  session.data?.user?.name ) 
 
    const { status } = session
    if (status === 'loading') {
        return 'Loading ...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    async function handleProfileInfoUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await fetch('api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName})
        })
    } 

    return ( 
        <section className="my-8">
            <h1 className="text-center text-primary my-6  text-4xl"> Profile </h1>
            <div className='max-w-lg mx-auto border p-4'>
                <div className="flex gap-4 items-center">
                    <div className="bg-gray-600 p-4 rounded-md">
                        <Image src={ userImage } className="rounded-full" width={ 128 } height={ 128 } alt={'avatar'} />
                        <button type="button" className="mt-2 text-white" > Change avatar </button>
                    </div>
                    <form className="grow" onSubmit={ handleProfileInfoUpdate }>
                        <input type="text"  value= { userName }  onChange={ e => setUserName(e.target.value) }/>
                        <input type="email" disabled={ true }  value= { userEmail }  />
                        <button type="submit"> Save </button>
                    </form>
                </div>
            </div>
        </section>  
    )
}