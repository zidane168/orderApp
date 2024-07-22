'use client';
import { useContext, useEffect, useState } from "react"
import { categoryApi } from "../api/categories/category.api"
import SectionHeaders from "@/components/layout/SectionHeaders";
import { ICategoryAndProducts } from "../api/product";
import MenuItem from "@/components/menu/MenuItem"; 
import { CartContext } from "@/components/AppContext";

export default function CartPage() {

    const { cartProducts } = useContext(CartContext);
 
   return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"> </SectionHeaders>
            </div>
            
            <h1> Checkout </h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    {
                        cartProducts?.length === 0 && (
                            <div className=""> No products in your shopping cart </div>
                        )
                    }
                    { cartProducts?.length > 0 && cartProducts.map(product => (
                        <div>
                            { product.name }
                        </div>
                    )) }
                </div>
                <div> right </div>
            </div>
        </section>
   )
}