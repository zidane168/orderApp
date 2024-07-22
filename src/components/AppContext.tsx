'use client'

import { IMemberTempCart } from "@/app/api/member-carts";
import { memberCartApi } from "@/app/api/member-carts/member-cart.api";
import { IProduct } from "@/app/api/product";
import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react"; 

export const CartContext = createContext({ });

export function AppProvider({ children } : {children : ReactNode}) {
    const [ cartProducts, setCartProducts ] = useState([]) 
    const [ singleCartProduct, setSingleCartProduct ] = useState<IMemberTempCart>({ product_id: 0, quantity: 0, product_size_id: 0, product_extra_ids: []}) 
 
    async function saveSingleCartProductToServer() {
        try {
            const { addToCart } = memberCartApi(); 
            const res = await addToCart({
                product_id: singleCartProduct.product_id,
                quantity: singleCartProduct.quantity,
                product_size_id: singleCartProduct.product_size_id,
                product_extra_ids: singleCartProduct.product_extra_ids
            }) 
            if (res.data.status) {
                console.log(res.data.message)
            } else {
                console.log(res.data.message)
            }
        } catch(error) {

        } 
 
    }

    async function clearCartProductOnServer() {
        const { clearCart } = memberCartApi();
        const res = await clearCart()
    }

    function addToCart( {product_id, quantity, product_size_id, product_extra_ids=[]}: IMemberTempCart) { 
        const cartProduct = { product_id: product_id, quantity: quantity, product_size_id: product_size_id, product_extra_ids: product_extra_ids }
        setSingleCartProduct(cartProduct)

        setCartProducts(prevProducts => {   
            const newProducts = [...prevProducts, cartProduct ] 
            return newProducts
        }) 
        saveSingleCartProductToServer()
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