'use client';
import { useContext, useEffect, useState } from "react" 
import SectionHeaders from "@/components/layout/SectionHeaders"; 
import { CardContextType, CartContext } from "@/components/AppContext";
import Image from "next/image";
import DeleteIcon from "@/components/icons/DeleteIcon"; 

import { ICartItem } from "@/app/api/member-carts"; 
import { useProfile } from "@/components/UseProfile";
import { IMember, memberApi } from "../api/members";

export default function CartPage() {
 
    const {  showCarts, removeCart, cartProducts } = useContext(CartContext) as CardContextType

    const [ phone, setPhone ] = useState('') 
    const [ streetAddress, setStreetAddress ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ postalCode, setPostalCode ] = useState('')
    const [ city, setCity ] = useState('') 

    let total = 0;
    for (const product of cartProducts) {
         total += Number(product.total_price)
    } 

    useEffect(() => {
        fetchCartItems()  
        fetchProfile();
    }, [])

    async function fetchProfile() {
 
        const { getProfile } = memberApi()
        const res = await getProfile() 

        if (res.data.status == 200) {
            const profileData = (res.data.params);
            setPhone(profileData.phone ?? '')
            setStreetAddress(profileData.street_address ?? '')
            setCountry(profileData.country ?? '')
            setPostalCode(profileData.postal_code ?? '')  
            setCity(profileData.city ?? '')
        } 
    }
 

    async function fetchCartItems() {
        await showCarts();
    }

    async function handleRemoveCartItem(id: number) {
        await removeCart(id)
    }
 
   return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"  />
            </div>
            
            <h1 className="text-2xl font-bold"> Checkout </h1>
            <div className="grid grid-cols-2 gap-4">
                <div> 
                    {
                        cartProducts?.length === 0 && (
                            <div className=""> No products in your shopping cart </div>
                        )
                    }
                    { cartProducts?.length > 0 && cartProducts.map( (cart:ICartItem, index) => (
                        <div key={ index } className="flex items-center gap-4 py-4 mb-4 border-b">
                            <div className="w-24"> 
                                { 
                                    cart.product?.image ?  <Image src={ cart.product.image } width={240} height={240} alt={ cart.product?.name} />  : '' 
                                }
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">
                                    { cart.product?.name }
                                </h3> 
                                {
                                    cart.product_size && (
                                        <div className="text-sm text-gray-700"> 
                                            <div> Size: <span> { cart.product_size?.name } </span> </div>
                                        </div>
                                    )
                                }

                                {
                                    cart.product_extra?.length > 0 && (
                                        <div className="text-sm text-gray-500"> 
                                            <ul >
                                            { cart.product_extra?.map( extra => (
                                                <li key={ extra.id }> { extra.name } ${extra.price}</li>
                                            )) }
                                            </ul>
                                        </div>
                                    ) 
                                }
                            </div>
                            <div>
                                <span className="font-semibold text-primary"> ${ cart?.total_price } </span>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    onClick={ () => handleRemoveCartItem(cart.id) }
                                    > 
                                    <DeleteIcon className="w-6 h-6"/> 
                                </button>
                            </div>
                        </div>
                    )) }
                    <div className="pr-20 text-right">
                        <span className="text-gray-500"> Subtotal: </span>
                        <span className="text-lg font-semibold"> ${total} </span>
                    </div>
                </div>
                <div className="p-4 bg-gray-300 rounded-lg">  
                    <div>
                        <label> Phone </label>
                        <input  readOnly={ true } type="text" value={ phone } onChange={ e => setPhone(e.target.value) }/>
                    </div>
                    <div>
                        <label> Street address </label>
                        <input  readOnly={ true } type="text" value={ streetAddress } onChange={ e => setStreetAddress(e.target.value) }/>
                    </div>
                    <div className="flex gap-2">
                        <div >
                            <label> Postal code </label>
                            <input readOnly={ true } type="text" value={ postalCode }  onChange={ e => setPostalCode(e.target.value) }/>
                        </div>
                        <div className="grow">
                            <label> City </label>
                            <input  readOnly={ true } type="text" value={ city } onChange={ e => setCity(e.target.value) }/>
                        </div>
                    </div>
                    <div>
                        <label> Country </label>
                        <input  readOnly={ true } type="text" value={ country } onChange={ e => setCountry(e.target.value) }/>
                    </div>

                   <button className=""
                        type="submit">
                            Pay ${total}
                   </button>

                </div>
            </div>
        </section>
   )
}