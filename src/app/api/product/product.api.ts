import commonAxios from "@/utils/axios/common.axios"; 
import type { AxiosResponseData } from "@/utils/axios/axios.types"; 
import { IProduct, IFile } from "./product.api.types";
 
export function productApi()  
{    
    const create = (payload: IProduct) => {
        return commonAxios.post<AxiosResponseData>("/api/v1/products/create.json", {
            ...payload,
        });
    }

    const update = (payload: IProduct) => {
        return commonAxios.post<AxiosResponseData>("/api/v1/products/update.json", {
            ...payload,
        });
    }
  
    const uploadImage = async (file: File) => { 
        try {   
            let payload:IFile = { isFile: true, file: file }; 
            return await commonAxios.post<AxiosResponseData>("/api/v1/products/uploadImage.json", {
                ...payload
            }); 
        
        } catch (error: any) {
            console.log('Error uploading image: ', error.message)
        } 
    }; 

    const getAllSize = async() => {
        return commonAxios.get<AxiosResponseData>("/api/v1/sizes/getAll.json")
    }
       
    return { create, update, uploadImage, getAllSize };
};
 