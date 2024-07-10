import commonAxios, { API_HOST } from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types";
import { IMember, ILogin, IAvatar, IUpdateMember } from "./member.api.types"; 
import axios from "axios"; 
  
import { ISession } from "@/types/sessions";
 
export function memberApi(session: ISession | null)  
{   

  const register = (payload: IMember) => {
    return commonAxios.post<AxiosResponseData>("/api/v1/members/register.json", {
      ...payload,
    });
  }

  const getProfile = () => { 
    return commonAxios.get<AxiosResponseData>("/api/v1/members/getProfile.json");
  }  

  const update = async(payload: IUpdateMember) => {
    return await commonAxios.post<AxiosResponseData>("/api/v1/members/update.json", {
     ...payload,
    })
  }

  const login = async(payload: ILogin) => { 
    payload.type = 2;
    return await commonAxios.post<AxiosResponseData>("/api/v1/members/login.json", {
      ...payload
    });
  }
 

 const uploadImage = async (file: File) => {
   
    try {  
      if (!session.user.token) { 
        console.error("No session token available.");
        return { 'data': {"status": 999, "message": 'No session token available'} }
      }

      const formData = new FormData();
      formData.append("file", file);  
  
      return await axios({
        url: API_HOST + '/api/v1/members/uploadImage.json',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Language: 'en_US', 
          Authorization: `Bearer ${session.user.token}`,
        },
      });
    } catch (error: any) {
      console.log('Error uploading image: ', error.message)
    }
   
  }

  return { login, register, getProfile, uploadImage, update };
};
 