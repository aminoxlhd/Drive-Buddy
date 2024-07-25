import axios from 'axios';
import { TeacherSignupData } from './Teacher';

const BASE_URL = 'http://localhost:5000/teacher';


export const createTeacher = async (formData: TeacherSignupData): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token')
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
      throw new Error('Error creating order');
    }
  };
  
  

export const getTeachers = async() => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    const responseJson = await response.data
    return responseJson;
}


export const deleteTeacher = async(teacherId : string) => {
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${BASE_URL}/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    const responseJson = await response.data
    return responseJson;
}