import axios from 'axios';
import { IOrder } from './orders.interface'

const BASE_URL = "process.env.REACT_APP_API_URL";


// Get order by ID
export const getOrderById = async (id: string): Promise<IOrder> => {
  try {
    const response = await axios.get<IOrder>(`${BASE_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching order');
  }
};

// Get all orders
export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axios.get<IOrder[]>(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching orders');
  }
};

// Create a new order
export const createOrder = async (order: IOrder): Promise<IOrder> => {
  try {
    const response = await axios.post<IOrder>(`${BASE_URL}/orders`, order);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating order');
  }
};

// Edit an existing order
export const editOrder = async (id: string, order: IOrder): Promise<IOrder> => {
  try {
    const response = await axios.put<IOrder>(`${BASE_URL}/orders/${id}`, order);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error editing order');
  }
};
