export interface LoginData {
  email: string;
  password: string;
}

export interface ResponseData {
  message: string;
  token?: string;
}