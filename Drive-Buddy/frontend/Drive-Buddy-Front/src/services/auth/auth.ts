import axios from 'axios';
import { LoginData, Student, Teacher } from './auth.interface';

const BASE_URL = 'http://localhost:5000';

export const loginUser = async (data: LoginData): Promise<any> => {
    const response = await fetch(BASE_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Login failed: ' + errorData.message);
    }

    let responseJson = response.json();
    return responseJson;
};


export const getCurrentStudent = async (): Promise<Student> => {
    let token = localStorage.getItem('token')
  
    const response = await axios.get(`${BASE_URL}/current_student`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    let responseJson = await response.data
    return responseJson;
  }
  

export const getCurrentTeacher = async (): Promise<Teacher> => {
    let token = localStorage.getItem('token')
  
    const response = await axios.get(`${BASE_URL}/current_teacher`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, 
      withCredentials : true
    });
  
    let responseJson = await response.data
    return responseJson;
  }

export const updateCurrentStudent = async (student : Student): Promise<void> => {
let token = localStorage.getItem('token')

const response = await axios.put(`${BASE_URL}/current_student`,
    student,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }, 
        withCredentials : true
    }
    
);

let responseJson = await response.data
return responseJson;
}

export const updateCurrentTeacher = async (teacher : Teacher): Promise<void> => {
    let token = localStorage.getItem('token')
    
    const response = await axios.put(`${BASE_URL}/current_teacher`,
        teacher,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
            withCredentials : true
        }
        
    );
    
    let responseJson = await response.data
    return responseJson;
    }
    


