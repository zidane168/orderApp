import axios from "axios";

import { commonConfig } from "../configs";
import { useSessionData } from "@/customHook/useSessionData";

import Cookies from 'js-cookie'

const commonAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
  headers: {
    Language: 'en_US',
    'Content-Type':  'application/json'
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

    const session: any = await useSessionData()
    if (session && session?.user?.token) {
      req.headers.Authorization = `Bearer ${session?.user?.token}`;
    }
 
    if (req.data?.isFile) { 
      req.headers["Content-Type"] = 'multipart/form-data'; 
    } 
 
    let language = 'en_US';
    if (Cookies.get('language') == 'en') {
      language = 'en_US'

    } else if (Cookies.get('language') == 'vi') {
      language = 'vi_VN'
    }

    req.headers["Language"] = language 

    switch ((req.method as string).toUpperCase()) {
      case "GET": {
        req.params = req.params || {};
        break;
      }
      case "POST": { 
        if (req.data?.isFile) {
          const formData = new FormData();
          formData.append("file", req.data.file);  
          req.data = formData
        } else {
          if (!(req.data instanceof FormData) && !!req.data) {
            req.data = formatFormData(req.data);
          }
        }  

        break;
      }
      case "PUT": {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = formatFormData(req.data); 
        }
        break;
      }

      case "PATCH": {
        req.data = JSON.stringify(req.data);  
        break;
      }

      case "DELETE": {
        req.data = JSON.stringify(req.data); 

        console.log( '---- ')
        console.log( req.data)
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
