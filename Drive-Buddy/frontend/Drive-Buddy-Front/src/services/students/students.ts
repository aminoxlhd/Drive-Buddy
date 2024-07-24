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

export const createStudent = async (formData: StudentFormData): Promise<boolean> => {
  try {
    let token = localStorage.getItem('token')
    const response = await axios.post(`${BASE_URL}`, 
      {
        email : formData.email,
        password : formData.password,
        first_name : formData.firstName,
        last_name : formData.lastName,
        date_birth : formData.dateOfBirth,
        phone_number : formData.phoneNumber
      },
      {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
        withCredentials : true
      }
    );
    const responseOk = response.status == 200
    return responseOk
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating order');
  }
};


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