export type IProduct = {
    id?: number
    name: string,
    quantity?: number,
    image_id: number,
    image?: string, 
    base_price: number,
    category_id: number,
    description: string,
    product_sizes?: IProductSize[],
    product_extras?: IProductExtra[],
}

export type IUpdateProduct = {
    id?: number
    name: string,
    quantity?: number,
    image_id: number,
    image?: string, 
    base_price: number,
    category_id: number,
    description: string,
    product_sizes?: ISize[],
    product_extras?: IExtra[],
}

export type ICreateProduct = { 
    name: string,
    quantity?: number,
    image_id: number,
    image?: string, 
    base_price: number,
    category_id: number,
    description: string,
    product_sizes?: ISize[],
    product_extras?: IExtra[],
} 

 
export type IGetProduct = {
    id: number
}

export type IFile = {
    file: File,
    isFile: boolean,
}

export type ISize = {
    name: string, 
    price: number,
} 

export type IExtra = {
    name: string, 
    price: number,
} 

export type IProductExtra = {
    id: number,
    name: string,
    price: number,
}

export type IProductSize = {
    id: number,
    name: string,
    price: number,
}
  
export type ICategoryAndProducts = {
    id: number,
    name: string,
    products: IProduct[],
    productExtras: IProductExtra[],
    productSizes: IProductSize[], 
}