// students/Students.ts

import axios from 'axios';

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
}

export async function createStudent(formData: StudentFormData): Promise<any> {
  try {
    const response = await axios.post('http://localhost:5000/api/signup/student', formData);
    return response.data; // Assuming backend returns some data on successful signup
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to sign up student');
  }
}