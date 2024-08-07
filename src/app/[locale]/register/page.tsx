'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {useTranslations} from 'next-intl';


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
    
    const t = useTranslations('RegisterPage');
    const tc = useTranslations('CommonPage');

    return (
        <section>
            <h1 className="mt-6 text-4xl text-center text-primary"> { t('register')} </h1>

            { userCreated && (
                    <div className="my-4 text-center"> 
                        { tc('userCreated') }<br /> <Link href={'/login'} className="underline"> { t('login')}  </Link>
                    </div>
            ) }

            { error && (
                <div className="my-4 text-center">
                    { tc('anErrorHasOccurred') } <br/>
                    { tc('pleaseTryAgainLater') } 
                </div>
            )}


            <form className="block max-w-xs mx-auto" onSubmit={ handleFormSubmit }>
                <input type="email" 
                    placeholder={ tc('inputEmailHere') } value={ email } onChange={ e => setEmail(e.target.value) } 
                    disabled={ creatingUser }
                />
                
                <input type="password" placeholder={ tc('inputPasswordHere') }  value={ password } 
                    disabled={ creatingUser }
                    onChange={ e => setPassword(e.target.value) } />
                
                <button 
                    disabled={ creatingUser }
                    type="submit"> 
                    { t('register') }
                </button>

                <div className="my-4 text-center text-gray-400"> 
                   { t('orLoginWithProvider') }
                </div>

                <button className="flex items-center justify-center gap-4 loginWithGoogle" disabled={ creatingUser }> 
                    <Image width={'32'}  height={'32'}  src={'/google.png'} objectFit={'contain'}   alt={'google icon'} />
                    { t('loginWithGoogle') }
                </button>

                <div className="p-4 my-6 mt-4 text-center text-gray-500 border-t text">
                    { t('existingAccount') } 
                    <Link className="underline" href={'/login'}> { t('login') } </Link>
                </div>
            </form>
          
        </section>
    ) 
}