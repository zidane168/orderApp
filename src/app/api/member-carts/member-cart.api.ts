import commonAxios from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types"; 
import { IMemberTempCart } from "./member-cart.api.types";
 
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

  const createInvoice = async(payload: string) => {
    return await commonAxios.post<AxiosResponseData>("/api/v1/invoices/create.json", {
        payload,
    })
  }   
  
  return { addToCart, showCart, createInvoice, clearCart, removeCart };
};
 