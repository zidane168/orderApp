export type IProduct = {
    id?: number
    name: string,
    image_id: number,
    base_price: number,
    category_id: number,
    description: string,
}
 
export type IFile = {
    file: File,
    isFile: boolean,
}

export type ISize = {
    name: string, 
    price: number,
}