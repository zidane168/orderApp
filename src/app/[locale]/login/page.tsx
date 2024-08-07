'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast"; 
import { useTranslations } from "next-intl";
 
export default function LoginPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loginInProgress, setLoginInProgress ] = useState(false); 

    const t = useTranslations('LoginPage');
    const tc = useTranslations('CommonPage');

    const [  ] = useState();

    async function handleFormSubmit(e: any) {
        e.preventDefault();
        setLoginInProgress(true)
        
        signIn('credentials', { email, password, callbackUrl: '/'}).then((result: any) => { 
        
            if (!result.error) {    // use Session and this result from api/auth/[...nextauth]
                toast( tc('loginSuccessfully')  ) 
            } else { 
                let rel = JSON.parse(result.error)  
                toast(rel.message)
            }
        });  

        setLoginInProgress(false) 
    }

    return (
        <section>
            <h1 className="mt-6 text-4xl text-center text-primary"> Login </h1>

            <form className="block max-w-xs mx-auto" onSubmit={ handleFormSubmit } >
                <input type="email" 
                    disabled={ loginInProgress }
                    name="email"
                    placeholder={ tc('inputEmailHere') } value={ email } onChange={ e => setEmail(e.target.value) }  
                />
                
                <input
                    disabled={ loginInProgress }
                    name="password"
                    type="password" placeholder={ tc('inputPasswordHere') } value={ password }  
                    onChange={ e => setPassword(e.target.value) } />
                
                <button  
                    disabled={ loginInProgress }
                    type="submit"> 
                    Login 
                </button>

                <div className="my-4 text-center text-gray-400">
                    { t('orLoginWithProvider') }
                </div>

                <button className="flex items-center justify-center gap-4 loginWithGoogle" 
                    onClick={ () => signIn('google', { callbackUrl: '/' }) }
                    type="button"
                > 
                    <Image width={'32'}  height={'32'}  src={'/google.png'} objectFit={'contain'}   alt={'google icon'} />
                    { t('loginWithGoogle') }
                </button>

                <div className="my-6 text-center text-gray-500 border-t text">
                    { t('dontHaveAccount') } <Link className="underline" href={'/register'}> { t('register') } </Link>
                </div>
 
            </form>
        </section>
    )
}