import commonAxios from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types";   
import { IName, ICategory, IId } from "./category.api.types";
 
export function categoryApi()  
{       
    const getFull = () => {
        return commonAxios.get<AxiosResponseData>("/api/v1/categories/getFull.json");
    } 

    const getAll = () => {
        return commonAxios.get<AxiosResponseData>("/api/v1/categories/getAll.json");
    }
    
    const create = (payload: IName) => {
        return commonAxios.post<AxiosResponseData>("/api/v1/categories/create.json", {
            ...payload,
        });
    }

    const update = (payload: ICategory) => {
        return commonAxios.post<AxiosResponseData>("/api/v1/categories/update.json", {
            ...payload,
        });
    }

    const remove = (payload: IId) => {
        return commonAxios.delete<AxiosResponseData>("/api/v1/categories/remove.json",  {
            data: { id: payload.id }, 
        });
    }
       
    return { create, getAll, update, remove, getFull };
};
    