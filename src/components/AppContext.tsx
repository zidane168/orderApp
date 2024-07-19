'use client'

import { memberCartApi } from "@/app/api/member-carts/member-cart.api";
import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react"; 

export const CartContext = createContext({ });

export function AppProvider({ children } : {children : ReactNode}) {
    const [ cartProducts, setCartProducts ] = useState([])

  
 
    async function saveCartProductOnServer() {
        const { addToCart } = memberCartApi();
        const res = await addToCart(cartProducts) 
 
    }

    async function clearCartProductOnServer() {
        const { clearCart } = memberCartApi();
        const res = await clearCart()
    }

    function addToCart(product_id, quantity, sizes=null, extras=[]) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product_id, quantity, sizes, extras }
            const newProducts = [...prevProducts, cartProduct ]
            return newProducts
        })

        saveCartProductOnServer()
    }

    function removeCartProduct(indexToRemove) {
        setCartProducts(prevProducts => {
            const newCartProducts = prevProducts.filter((_, index) => index !== indexToRemove)
            return newCartProducts
        })
    }

    function clearCart() {
        setCartProducts([])
    }

    return (
        <SessionProvider> 
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart, clearCart
            }}>
                { children }
            </CartContext.Provider> 
        </SessionProvider>
    )
}