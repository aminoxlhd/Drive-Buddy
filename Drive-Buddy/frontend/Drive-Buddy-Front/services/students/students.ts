import axios from 'axios';
import { IStudent } from './students.interface'

const BASE_URL = "process.env.REACT_APP_API_URL";

// Get student by ID
export const getStudentById = async (id: string): Promise<IStudent> => {
  try {
    const response = await axios.get<IStudent>(`${BASE_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching student');
  }
};

// Get all students
export const getAllStudents = async (): Promise<IStudent[]> => {
  try {
    const response = await axios.get<IStudent[]>(`${BASE_URL}/students`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching students');
  }
};

// Create a new student
export const createStudent = async (student: IStudent): Promise<IStudent> => {
  try {
    const response = await axios.post<IStudent>(`${BASE_URL}/students`, student);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating student');
  }
};

// Edit an existing student
export const editStudent = async (id: string, student: IStudent): Promise<IStudent> => {
  try {
    const response = await axios.put<IStudent>(`${BASE_URL}/students/${id}`, student);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error editing student');
  }
};
