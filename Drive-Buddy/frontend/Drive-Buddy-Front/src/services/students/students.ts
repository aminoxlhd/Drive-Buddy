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

const BASE_URL = 'http://localhost:5000/student';

export async function createStudent(formData: StudentFormData): Promise<any> {
  try {
    const response = await axios.post('http://localhost:5000/api/signup/student', formData);
    return response.data; // Assuming backend returns some data on successful signup
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to sign up student');
  }
}


export const getStudents = async() => {
  let token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  let responseJson = await response.data
  return responseJson;
}




export const deleteStudent = async(studentId : string) => {
  let token = localStorage.getItem('token')
  const response = await axios.delete(`${BASE_URL}/${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  let responseJson = await response.data
  return responseJson;
}