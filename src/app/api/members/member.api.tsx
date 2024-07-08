import commonAxios, { API_HOST } from "@/utils/axios/common.axios";

import type { AxiosResponseData } from "@/utils/axios/axios.types";
import { IMember, ILogin, IAvatar } from "./member.api.types"; 
import axios from "axios";

 
import { useSessionData } from '@/customHook/useSessionData'
// const memberApi = {  

//   register: (payload: IMember) => {
//     return commonAxios.post<AxiosResponseData>("/api/v1/members/register.json", {
//       ...payload,
//     });
//   },  

//   getProfile: () => {
//     const token = localStorage.getItem('token');
//     return commonAxios.post<AxiosResponseData>("/api/v1/members/getProfile.json", {  
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     });
//   },  

//   login: (payload: ILogin) => { 
//     payload.type = 2;
//     return commonAxios.post<AxiosResponseData>("/api/v1/members/login.json", {
//       ...payload
//     });
//   }, 

//  // uploadImage: async (file: File, token: any) => {

//  uploadImage: async (file: File) => {
   
//     try {  
//       if (!session.user.token) { 
//         console.error("No session token available.");
//         return { 'data': {"status": 999, "message": 'No session token available'} }
//       }

//       const formData = new FormData();
//       formData.append("file", file);  
  
//       return await axios({
//         url: API_HOST + '/api/v1/members/uploadImage.json',
//         method: 'POST',
//         data: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//           Language: 'en_US', 
//           Authorization: `Bearer ${session.user.token}`,
//         },
//       });
//     } catch (error: any) {
//       console.log('Error uploading image: ', error.message)
//     }
   
//   }
// };


function memberApi() 
{  
  const session = useSessionData();

  const register = (payload: IMember) => {
    return commonAxios.post<AxiosResponseData>("/api/v1/members/register.json", {
      ...payload,
    });
  }

  const getProfile = () => { 
    return commonAxios.post<AxiosResponseData>("/api/v1/members/getProfile.json", {  
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      }
    });
  }  

  const login = (payload: ILogin) => { 
    payload.type = 2;
    return commonAxios.post<AxiosResponseData>("/api/v1/members/login.json", {
      ...payload
    });
  }

 // uploadImage: async (file: File, token: any) => {

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

  return { login, register, getProfile, uploadImage };
};

export default memberApi;
