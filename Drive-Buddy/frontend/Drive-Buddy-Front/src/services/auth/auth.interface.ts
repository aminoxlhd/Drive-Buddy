export interface LoginData {
  email: string;
  password: string;
  type : string;
}

export interface ResponseData {
  message: string;
  access_token?: string;
}


export interface Student {
  media: string;
  id : string,
  email : string,
  first_name : string,
  last_name : string
}

export interface Teacher {
  media: string;
  id : string,
  email : string,
  first_name : string,
  last_name : string
}