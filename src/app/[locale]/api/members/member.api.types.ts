 

export type IMember = {   
  email: string,
  name: string,
  phone?: string,
  is_admin?: boolean,
  password: string,
  type?: number,     // 1: google, 2: credentials
  postal_code?: string,
  country?: string,
  city?: string,
  street_address?: string,
}

export type IUpdateMember = {   
  name: string,
  phone?: string,
  password?: string, 
  avatar_id?: number,
  street_address: string,
  postal_code?: string,
  country?: string,
  city?: string,
}

export type ILoginGoogle = {
  access_token: string,       // for social google login
  type: number
}

export type ILogin = {
  email: string, 
  password: string, 
  type: number
}
  

export type IFile = {
  file: File,
  isFile: boolean,
}

export type IAvatar = {
  file: any
}