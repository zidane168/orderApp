import commonAxios from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types";
import { IMember, ILogin } from "./member.api.types";
import { headers } from "next/headers";

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
};

export default memberApi;
