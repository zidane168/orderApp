'use client'

import { ICartItem, IMemberTempCart } from "@/app/api/member-carts";
import { memberCartApi } from "@/app/api/member-carts/member-cart.api";
import { SessionProvider } from "next-auth/react"; 
import { createContext, ReactNode, useEffect, useState } from "react"; 
import toast from 'react-hot-toast'  

export type CardContextType = {
    cartProducts: ICartItem[];
    addToCart: (memberTempCart: IMemberTempCart) => void;
    removeCart: (id: number) => void;
    showCarts: () => void;
    clearCart: () => void;
  };

export const CartContext = createContext<CardContextType | null>(null);

// TRUNCATE   `member_temp_carts`;
// TRUNCATE   `member_temp_cart_extras`;

// dung mo hinh nay de save duoi local storage và dùng chung dc các module với nhau

export function AppProvider({ children } : {children : ReactNode}) {
    const [ cartProducts, setCartProducts ] = useState<ICartItem[]>([]) 
   
    async function saveSingleCartProductToServer( {product_id, quantity, product_size_id, product_extra_ids=[]}: IMemberTempCart ) {
        try {
            const { addToCart } = memberCartApi(); 
            const res = await addToCart({
                product_id: product_id,
                quantity:  quantity,
                product_size_id:  product_size_id,
                product_extra_ids:  product_extra_ids
            }) 
            if (res.data.status === 200) { 
                const currentProduct: ICartItem = res.data.params
                setCartProducts( (previousProduct) => {
                    return  [...previousProduct, currentProduct] 
                }) 
                toast.success( res.data.message); 

            } else { 
                toast.error(res.data.message);
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
        saveSingleCartProductToServer( cartProduct )   
    }

    async function removeCart(idNeedToRemove: number) {
        setCartProducts(prevProducts => {
            const newCartProducts = prevProducts.filter((value, _) => value.id !== idNeedToRemove)
            return newCartProducts
        })

        const { removeCart } = memberCartApi()
        const res = await removeCart( idNeedToRemove );

        if (res.data.status === 200) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    function clearCart() {
        setCartProducts([])
    }

    async function showCarts() {
        try {
            const { showCart } = memberCartApi();
            const res = await showCart();

            if (res.data.status === 200) { 

                console.log(res.data.params )
                setCartProducts(res.data.params);
            }

        } catch (error) {

        }
    }

    return (
        <SessionProvider> 
            <CartContext.Provider value={{
                cartProducts,  addToCart, clearCart, showCarts, removeCart
            }}>
                { children }
            </CartContext.Provider> 
        </SessionProvider>
    )
}