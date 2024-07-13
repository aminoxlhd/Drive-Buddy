import axios from 'axios';
import { IDriverBuddy } from './driverbuddies.interface';

const BASE_URL = "process.env.REACT_APP_API_URL";



export const getDriverBuddyById = async (id: string): Promise<IDriverBuddy> => {
  try {
    const response = await axios.get<IDriverBuddy>(`${BASE_URL}/driverbuddies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching DriverBuddy');
  }
};

// Get all DriverBuddies
export const getAllDriverBuddies = async (): Promise<IDriverBuddy[]> => {
  try {
    const response = await axios.get<IDriverBuddy[]>(`${BASE_URL}/driverbuddies`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error fetching DriverBuddies');
  }
};

// Create a new DriverBuddy
export const createDriverBuddy = async (driverBuddy: IDriverBuddy): Promise<IDriverBuddy> => {
  try {
    const response = await axios.post<IDriverBuddy>(`${BASE_URL}/driverbuddies`, driverBuddy);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error creating DriverBuddy');
  }
};

// Edit an existing DriverBuddy
export const editDriverBuddy = async (id: string, driverBuddy: IDriverBuddy): Promise<IDriverBuddy> => {
  try {
    const response = await axios.put<IDriverBuddy>(`${BASE_URL}/driverbuddies/${id}`, driverBuddy);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error editing DriverBuddy');
  }
};
