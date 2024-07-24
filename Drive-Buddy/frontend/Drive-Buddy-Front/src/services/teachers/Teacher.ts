export interface TeacherSignupData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
}

export interface ResponseData {
  message: string;
  token?: string;
}