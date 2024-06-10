'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loginInProgress, setLoginInProgress ] = useState(false);

    async function handleFormSubmit(e: any) {
        e.preventDefault();
        setLoginInProgress(true)
        
        await signIn('credentials', { email, password, callbackUrl: '/'});
        // await signIn('credentials' );

        setLoginInProgress(false)
 
    }

    return (
        <section>
            <h1 className="text-center text-primary mt-6  text-4xl"> Login </h1>

            <form className="block max-w-xs mx-auto" onSubmit={ handleFormSubmit } >
                <input type="email" 
                    disabled={ loginInProgress }
                    name="email"
                    placeholder="Input email here" value={ email } onChange={ e => setEmail(e.target.value) }  
                />
                
                <input
                    disabled={ loginInProgress }
                    name="password"
                    type="password" placeholder="Input your assword here" value={ password }  
                    onChange={ e => setPassword(e.target.value) } />
                
                <button  
                    disabled={ loginInProgress }
                    type="submit"> 
                    Login 
                </button>

                <div className="text-center text-gray-400 my-4">
                   Or login with provide
                </div>

                <button className="flex gap-4 items-center justify-center loginWithGoogle" 
                    onClick={ () => signIn('google', { callbackUrl: '/' }) }
                    type="button"
                > 
                    <Image width={'32'}  height={'32'}  src={'/google.png'} objectFit={'contain'}   alt={'google icon'} />
                    Login with google 
                </button>

                <div className="my-6 text-center text-gray-500 text border-t">
                    Don't have account? <Link className="underline" href={'/register'}> Register </Link>
                </div>
 
            </form>
        </section>
    )
}