import axios from "axios";
import { IUser } from "./auth.interface";

const BASE_URL = "process.env.REACT_APP_API_URL";


export const getUserById = async (id: string): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>(`${BASE_URL}users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching user');
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching users');
  }
};

export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await axios.post<IUser>(`${BASE_URL}/users`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error creating user');
  }
};

export const editUser = async (id: string, user: IUser): Promise<IUser> => {
  try {
    const response = await axios.put<IUser>(`${BASE_URL}/users/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error editing user');
  }
};