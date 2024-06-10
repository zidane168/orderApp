'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
 

export default function RegisterPage() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ creatingUser, setCreateingUser ] =  useState(false)
    const [ userCreated, setUserCreated ] = useState(false)
    const [ error, setError ] = useState(false)

    async function handleFormSubmit(e: any) {
        e.preventDefault()
        setCreateingUser(true)
        setError(false)
        setUserCreated(false)

        const response = await fetch('/api/register', { 
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}, 
        })

        if (response.ok) {
            setUserCreated(true)

        } else { 
            setError(true)
        }  
 
        setCreateingUser(false)
    }

    return (
        <section>
            <h1 className="text-center text-primary mt-6  text-4xl"> Register </h1>

            { userCreated && (
                    <div className="my-4 text-center"> 
                        User Created.<br /> Now you can <Link href={'/login'} className="underline"> Login </Link>
                    </div>
            ) }

            { error && (
                <div className="my-4 text-center">
                    Ann error has occurred <br/>
                    Please try again later
                </div>
            )}


            <form className="block max-w-xs mx-auto" onSubmit={ handleFormSubmit }>
                <input type="email" 
                    placeholder="Input email here" value={ email } onChange={ e => setEmail(e.target.value) } 
                    disabled={ creatingUser }
                />
                
                <input type="password" placeholder="Input your assword here" value={ password } 
                    disabled={ creatingUser }
                    onChange={ e => setPassword(e.target.value) } />
                
                <button 
                    disabled={ creatingUser }
                    type="submit"> 
                    Register 
                </button>

                <div className="text-center text-gray-400 my-4">
                   Or login with provide
                </div>

                <button className="flex gap-4 items-center justify-center loginWithGoogle" disabled={ creatingUser }> 
                    <Image width={'32'}  height={'32'}  src={'/google.png'} objectFit={'contain'}   alt={'google icon'} />
                    Login with google 
                </button>

                <div className="my-6 text-center text-gray-500 text border-t">
                    Existing Account? <Link className="underline" href={'/login'}> Login </Link>
                </div>
            </form>
          
        </section>
    ) 
}