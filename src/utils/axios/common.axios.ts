import axios from "axios";

import { commonConfig } from "../configs";  
import { useSessionData } from "@/customHook/useSessionData"; 

const commonAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
  headers: {
    Language: 'en_US', 
    'Content-Type': 'application/json' 
  }
});

export const API_HOST = `${commonConfig.API_HOST}` 

export const formatFormData = (data: Object) => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value) && value.some((v) => v instanceof File)) {
      fd.append(`${key}[]`, value as any);
    } else {
      fd.append(
        key,
        typeof value === "string" || value instanceof File
          ? value
          : JSON.stringify(value)
      );
    }
  });
  return fd;
};

commonAxios.interceptors.request.use(
  async (req) => { 
     
    const session = await useSessionData() 
    if (session && session?.user?.token) {
      req.headers.Authorization = `Bearer ${session?.user?.token}`;
    }
    
    switch ((req.method as string).toUpperCase()) {
      case "GET": {
        req.params = req.params || {}; 
        break;
      }
      case "POST": {   
        console.log(' ----- POST ----- ')
        console.log( req )
        console.log(' ----------- ')
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = formatFormData(req.data);    
        }
 
        break;
      }
      case "PUT": {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = formatFormData(req.data);  
          // req.data = commonHelpers.formatFormData(req.data);
        } 
        break;
      }
    }
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

commonAxios.interceptors.response.use(
  (res) => {  
    return res;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default commonAxios;
