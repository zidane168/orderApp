import {  RawAxiosRequestHeaders } from 'axios';
 

export type IMember = {   
  email: string,
  name: string,
  phone?: string,
  password: string,
  type: number,     // 1: google, 2: credentials
}

export type IUpdateMember = {   
  name: string,
  phone?: string,
  password?: string, 
  avatar_id?: number,
}


export type ILogin = {
  email: string, 
  password: string,
  type: number
}

export type IAvatar = {
  file: any
}