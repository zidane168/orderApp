'use client'

import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useState } from "react"; 

export const CartContext = createContext({ });

export function AppProvider({ children } : {children : ReactNode}) {
    const [ cartProducts, setCartProducts ] = useState([])

    function addToCart(id, size=null, extras=[]) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...id, size, extras }
            const newProducts = [...prevProducts, cartProduct ]
            return newProducts
        })
    }

    return (
        <SessionProvider> 
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart
            }}>
                { children }
            </CartContext.Provider> 
        </SessionProvider>
    )
}