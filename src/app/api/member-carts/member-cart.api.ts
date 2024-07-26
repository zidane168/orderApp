import commonAxios from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types"; 
import { IMemberTempCart, IUpdateQuantity, IInvoice } from "./member-cart.api.types";
 
export function memberCartApi()  
{     

  const addToCart = (payload: IMemberTempCart) => { 
    return commonAxios.post<AxiosResponseData>("/api/v1/memberTempCarts/addToCart.json", {
        ...payload
    });
  }  

  const clearCart = () => { 
    return commonAxios.post<AxiosResponseData>("/api/v1/memberTempCarts/clearCart.json");
  }  

  const removeCart = (id: number) => { 
    return commonAxios.delete<AxiosResponseData>("/api/v1/memberTempCarts/removeCart.json", {
      data: {
        member_temp_cart_id: id
      } 
    });
  }   

  const showCart = async() => {
    return await commonAxios.get<AxiosResponseData>("/api/v1/memberTempCarts/showCart.json")
  }   

  const createInvoice = async(payload: IInvoice) => {
    return await commonAxios.post<AxiosResponseData>("/api/v1/invoices/create.json", {
      member_temp_cart_ids: payload.member_temp_cart_ids,
    })
  }   

  const updateQuantity = async(payload: IUpdateQuantity) => {
    return await commonAxios.patch<AxiosResponseData>("/api/v1/memberTempCarts/updateQuantity.json", { 
      member_temp_cart_id: payload.member_temp_cart_id,
      quantity: payload.quantity, 
    })
  }
  
  return { addToCart, showCart, createInvoice, clearCart, removeCart, updateQuantity };
};
 