'use client';

import Image from "next/image";
import { useState } from "react";
 

export default function RegisterPage() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch('/api/register', { 
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type': 'application/json'}, 
        })
    }

    return (
        <section>
            <h1 className="text-center text-primary mt-6  text-4xl"> Register </h1>
            <form className="block max-w-xs mx-auto" onSubmit={ handleFormSubmit }>
                <input type="email" placeholder="Input email here" value={ email } onChange={ e => setEmail(e.target.value) } />
                <input type="password" placeholder="Input your assword here" value={ password } onChange={ e => setPassword(e.target.value) } />
                <button type="submit"> Register </button>
                <div className="text-center text-gray-400 my-4">
                   Or login with provide
                </div>
                <button className="flex gap-4 items-center justify-center"> 
                    <Image width={'32'}  height={'32'}  src={'/google.png'} objectFit={'contain'}   alt={'google icon'} />
                    Login with google </button>
            </form>
          
        </section>
    ) 
}