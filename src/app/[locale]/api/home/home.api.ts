import commonAxios from "@/utils/axios/common.axios"; 
import type { AxiosResponseData } from "@/utils/axios/axios.types"; 
 
export function homeApi()  
{      
  const getInfo = () => { 
    return commonAxios.get<AxiosResponseData>("/api/v1/homes/getInfo.json");
  }   
  
  return { getInfo };
};
 