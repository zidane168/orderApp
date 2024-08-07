'use client';
import { useContext, useEffect, useState } from "react" 
import SectionHeaders from "@/components/layout/SectionHeaders"; 
import { CardContextType, CartContext } from "@/components/AppContext";
import Image from "next/image";
import DeleteIcon from "@/components/icons/DeleteIcon"; 

import { ICartItem, memberCartApi } from "@/app/api/member-carts";  
import { IMember, memberApi } from "../../api/members";
import toast from 'react-hot-toast';
import { formattedPrice } from "@/utils/helpers/common";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// ----------------------- ----------------------- FLOW cart page ----------------------- -----------------------
// 1. Loaded first time => get cartProducts from appContext.tsx 
//    -> const {  removeCart, cartProducts, assignCartProducts } = useContext(CartContext) as CardContextType
// 2. Click into reduce, increase, input quantity
//    -> it will call related state with index and will index we will show or hide the button-, button+
//       const [ reduceButtonsStatus, setReduceButtonsStatus ] = useState<boolean[]>([]);
//       const [ increaseButtonsStatus, setIncreaseButtonsStatus ] = useState<boolean[]>([]);
//    ->   reduceButtonsStatus.length > 0 && reduceButtonsStatus[index]  && ( <button onClick={ e => handleReduce(index) }> - </button>  )
//    -> when click inside button, it will trigger async function handleReduce(index: number) { ...}
//      -> it will update related index state and update the cartProducts Content by assign it
//      ->     useEffect(() => {
//       fetchCartItems()  
//        fetchProfile();
//        handleUpdatePriceEachProductWithNumberFormatted()
//    }, [cartProducts])
// This effect will update the Total price when any cartProducts change 
// -------------------- -------------------- --------------------  -----------------------  ----------------------

export default function CartPage() {

    const session = useSession()
 
    const {  removeCart, cartProducts, assignCartProducts } = useContext(CartContext) as CardContextType

    const [ phone, setPhone ] = useState('') 
    const [ streetAddress, setStreetAddress ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ postalCode, setPostalCode ] = useState('')
    const [ city, setCity ] = useState('') 

    const { status } = session

    const [ quantities, setQuantities ] = useState<number[]>([])
    const [ prices, setPrices ] = useState<number[]>([]) 

    const [ reduceButtonsStatus, setReduceButtonsStatus ] = useState<boolean[]>([]);
    const [ increaseButtonsStatus, setIncreaseButtonsStatus ] = useState<boolean[]>([]);
    const [ totalFormatted, setTotalFormatted ] = useState<string>('') 

    useEffect(() => {
        fetchProfile();
    }, [])

    useEffect(() => {
        fetchCartItems()  
      
        handleUpdatePriceEachProductWithNumberFormatted()
    }, [cartProducts])

    if (status === 'loading') {
        return 'Loading ...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

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
 
    function fetchCartItems() { 

        const qty:number[] = [...quantities]
        const reduceBtn = [...reduceButtonsStatus]
        const increaseBtn = [...increaseButtonsStatus]
       
        cartProducts.map( (cart, index) => {
            qty[index] = cart.product.quantity ?? 0
            if (qty[index] <= 1) {
                reduceBtn[index] = false
            } else{
                reduceBtn[index] = true
            }

            if (qty[index] >= 30){
                increaseBtn[index] = false;
            } else {
                increaseBtn[index] = true
            } 
            
        })
        setQuantities(qty);
        setReduceButtonsStatus(reduceBtn)
        setIncreaseButtonsStatus(increaseBtn) 
    }

    function handleUpdatePriceEachProductWithNumberFormatted() {

        let total: number = 0;
        for (const product of cartProducts) {
            total += Number(product.total_price)
        } 
        let totalDisplay: string = formattedPrice(total)
        setTotalFormatted(totalDisplay)
    }

    async function handleQuantityChange(ev: React.ChangeEvent<HTMLInputElement>, index: number) {
        const value = Number(ev.target.value)
        if (value > 30) {
            toast.error('Max quantity each item is 30')
            return;
        }
        const newQuantities = [...quantities];
        newQuantities[index] = value
        setQuantities(newQuantities)

        const newPrices = [...prices];

        let onePrice = 0;
        if (cartProducts[index].product.quantity &&  cartProducts[index].product.quantity > 0) {
            onePrice = cartProducts[index].total_price / cartProducts[index].product.quantity 
        } 
       
        newPrices[index] = newQuantities[index] * onePrice
        setPrices(newPrices)

        // call api here to update server
        const { updateQuantity } = memberCartApi();
        const res = await updateQuantity({ member_temp_cart_id:  cartProducts[index].id, quantity: Number(ev.target.value)} )
        if (res.data.status === 200) {
            assignCartProducts (res.data.params); 
        } 
    }

    async function handlePayButtonClick() {
        const { createInvoice } = memberCartApi();

        const ids: number[] = [];
        cartProducts.map( (cart) => {
            return ids.push(cart.id);
        })
        const res = await createInvoice({member_temp_cart_ids: ids});
        if (res.data.status === 200) {
            toast.success(res.data.message)
            window.location.href = '/'; 
        }
    }

    async function handleRemoveCartItem(id: number) {
        await removeCart(id)
    }
 
    async function handleReduce(index: number) {   
        const newQuantities = [...quantities];
        newQuantities[index]--;
        setQuantities(newQuantities)  
        
        setReduceButtonsStatus(prev => {  
            const status = [...reduceButtonsStatus]
            status[index] = true
            return status 
        }) 
        
        setIncreaseButtonsStatus(prev => {  
            const status = [...increaseButtonsStatus]
            status[index] = true
            return status 
        })  
        if (newQuantities[index] <= 2) {
            setReduceButtonsStatus(prev => {  
                const status = [...reduceButtonsStatus]
                status[index] = false
                return status 
            }) 
        }   
        
        // call api here to update server
        const { updateQuantity } = memberCartApi();
        const res = await updateQuantity({ member_temp_cart_id:  cartProducts[index].id, quantity: newQuantities[index]} )
        if (res.data.status === 200) {
            assignCartProducts (res.data.params); 
        } 
    } 
    async function handleIncrease(index: number) {
         
        const newQuantities = [...quantities];
        newQuantities[index]++; 
        setQuantities(newQuantities)  

        setReduceButtonsStatus(prev => {  
            const status = [...reduceButtonsStatus]
            status[index] = true
            return status 
        }) 
        setIncreaseButtonsStatus(prev => {  
            const status = [...increaseButtonsStatus]
            status[index] = true
            return status 
        }) 
        if (newQuantities[index] >= 30) {
            setIncreaseButtonsStatus(prev => {  
                const status = [...increaseButtonsStatus]
                status[index] = false
                return status 
            }) 
        }   
        
        const { updateQuantity } = memberCartApi();
        const res = await updateQuantity({ member_temp_cart_id:  cartProducts[index].id, quantity: newQuantities[index]} )
        if (res.data.status === 200) {
            assignCartProducts (res.data.params); 
        } 
    }

    return (
    
        <section className="mt-8">
            
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"  />
            </div>
            
            <h1 className="text-2xl font-bold"> Checkout </h1>
         
            <div> 
                {
                    cartProducts?.length === 0 && (
                        <div className=""> No products in your shopping cart </div>
                    )
                }
                { cartProducts?.length > 0 && cartProducts.map( (cart:ICartItem, index) => (
                    <div key={ index } className="flex items-center gap-4 py-4 mb-4">
                        <div className="w-24"> 
                            { 
                                cart.product?.image ?  <Image src={ cart.product.image } width={240} height={240} alt={ cart.product?.name} />  : '' 
                            }
                        </div>
                        <div className="w-[280px]">
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
                        <div className="flex items-center gap-2 grow">
                            <div className="w-[50px]" > 
                            {
                                reduceButtonsStatus.length > 0 && reduceButtonsStatus[index]  && ( <button onClick={ e => handleReduce(index) }> - </button>  )
                            }
                            </div>
                            
                            <input  className="font-semibold w-[80px] text-center"  
                                    value={ quantities?.[index] ? quantities[index] : cart?.product.quantity } 
                                    onChange={ (e) => handleQuantityChange(e, index)} /> 

                            <div className="w-[50px]" > 
                            {
                                increaseButtonsStatus.length > 0 && increaseButtonsStatus[index]  && (  <button  onClick={ e => handleIncrease(index) } > + </button> )
                            }
                            </div>
                           
                        </div>
                        <div>
                            <span className="font-semibold text-primary"> ${ prices?.[index] ? prices[index] : cart?.total_price } </span>
                        </div>

                        <div className="pr-2">
                            <button
                                type="button"
                                onClick={ () => handleRemoveCartItem(cart.id) }
                                > 
                                <DeleteIcon className="w-6 h-6"/> 
                            </button>
                        </div>
                    </div>
                )) }
                <div className="text-right pr-[75px]">
                    <span className="text-gray-500"> Subtotal: </span>
                    <span className="ml-10 text-lg font-semibold text-primary">  {totalFormatted} </span>
                </div>
            </div>
                  
            <div className="p-4 mt-8 bg-gray-300 rounded-lg">  
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
                        onClick={handlePayButtonClick}
                        type="submit">
                            Pay {totalFormatted}
                   </button>

                </div>
        </section>
   )
}