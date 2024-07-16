export interface StudentSignupData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export interface ResponseData {
  message: string;
  token?: string;
}
