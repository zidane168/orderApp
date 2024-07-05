import commonAxios, { API_HOST } from "@/utils/axios/common.axios";

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
    const formData = new FormData();
    formData.append("file", file);  

    return await axios({
      url: API_HOST + '/api/v1/members/uploadImage.json',
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
