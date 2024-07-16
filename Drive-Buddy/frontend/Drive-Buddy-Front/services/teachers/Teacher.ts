export interface TeacherSignupData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  vehicleModelYear: string;
  vehicleCategory: string;
  vehicleType: string;
  driverLicense: File | null;
  acceptConditions: boolean;
}

export interface ResponseData {
  message: string;
  token?: string;
}