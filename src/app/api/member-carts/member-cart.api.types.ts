import { IProduct, IProductExtra, IProductSize } from "../product"

export type IMemberTempCart = {   
    product_id: number, 
    quantity: number, 
    product_size_id: number,
    product_extra_ids: number[],
}

export type ICartItem = {
    id: number, 
    product: IProduct,
    product_extra: IProductExtra[],
    product_size: IProductSize,
    total_price: number,
}

export type IUpdateQuantity = {
    member_temp_cart_id: number, 
    quantity: number,
}