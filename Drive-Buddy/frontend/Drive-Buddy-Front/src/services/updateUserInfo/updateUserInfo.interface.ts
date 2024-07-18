// services/updateUserInfo/updateUserInfo.interface.ts

export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatarUrl?: File; // for uploading profile picture
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  }
  
  export interface ResponseData {
    message: string;
    user?: User;
  }  