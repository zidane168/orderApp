import commonAxios from "@/utils/axios/common.axios"; 
import type { AxiosResponseData } from "@/utils/axios/axios.types"; 
import { IProduct, IFile, IGetProduct, IUpdateProduct, ICreateProduct } from "./product.api.types";
 
export function productApi()  
{    
    const get = async(payload: IGetProduct) => {
        return commonAxios.get<AxiosResponseData>("/api/v1/products/get.json?id=" + payload.id)
    }

    const getAll = async() => {
        return commonAxios.get<AxiosResponseData>("/api/v1/products/getAll.json")
    }

    const create = (payload: ICreateProduct) => {
        return commonAxios.post<AxiosResponseData>("/api/v1/products/create.json", {
            ...payload,
        });
    }

    const update = (payload: IUpdateProduct) => {
        return commonAxios.post<AxiosResponseData>("/api/v1/products/update.json", {
            ...payload,
        });
    }

    const remove = (payload: IGetProduct) => {
        return commonAxios.delete<AxiosResponseData>("/api/v1/products/remove.json", {
            data: {
                id: payload.id,     // need pass the id same this on post man with {id: 18}
            }
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
       
    return { create, update, remove, uploadImage, getAllSize, getAll, get };
};
 