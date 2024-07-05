import commonAxios from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types";
import { IMember, ILogin, IAvatar } from "./member.api.types"; 
import axios from "axios";

const memberApi = {
  register: (payload: IMember) => {
    return commonAxios.post<AxiosResponseData>("/api/v1/members/register.json", {
      ...payload,
    });
  },  

  getProfile: () => {
    const token = localStorage.getItem('token');
    return commonAxios.post<AxiosResponseData>("/api/v1/members/getProfile.json", {  
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  },  

  login: (payload: ILogin) => { 
    payload.type = 2;
    return commonAxios.post<AxiosResponseData>("/api/v1/members/login.json", {
      ...payload
    });
  }, 

  uploadImage: async (file: File) => {
    var formData = new FormData();
    formData.append("file", file);

    console.log( '------ files ------' )
    console.log( file )

    commonAxios.defaults.headers['Content-Type'] = 'multipart/form-data';
    // return commonAxios.post<AxiosResponseData>('/api/v1/members/uploadImage.json', { 
    //   data: file
    // });

    return await axios({
      url: 'http://localhost:8888/Ecommerce-NextJS/order-app-server/api/v1/members/uploadImage.json',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Language: 'en_US'
      },
    });
  }
};

export default memberApi;
