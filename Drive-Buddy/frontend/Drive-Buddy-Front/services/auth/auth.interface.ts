export interface LoginData {
  email: string;
  password: string;
  type : string;
}

export interface ResponseData {
  message: string;
  access_token?: string;
}