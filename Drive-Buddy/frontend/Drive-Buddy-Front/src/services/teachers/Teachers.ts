import axios from 'axios';
import { ResponseData, TeacherSignupData } from './Teacher';

const BASE_URL = 'http://localhost:5000/teacher';

export const signupTeacher = async (data: TeacherSignupData): Promise<ResponseData> => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        const value = data[key as keyof TeacherSignupData];
        if (key === 'driverLicense' && value) {
            formData.append(key, value);
        } else {
            formData.append(key, value as string);
        }
    });

    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Signup failed: ' + errorData.message);
    }

    return response.json();
};


export const getTeachers = async() => {
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


export const deleteTeacher = async(teacherId : string) => {
    let token = localStorage.getItem('token')
    const response = await axios.delete(`${BASE_URL}/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    let responseJson = await response.data
    return responseJson;
}