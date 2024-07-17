import axios from 'axios';
import { OrderModel } from './orders'

const BASE_URL = "process.env.REACT_APP_API_URL";


// Get order by ID
export const getOrderById = async (id: string | undefined): Promise<OrderModel> => {
  try {
    const response = await axios.get<OrderModel>(`${BASE_URL}/purchase/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching order');
  }
};

export const getOrderByUserId = async (id : string | undefined): Promise<OrderModel> => {
  const response = await fetch(`${BASE_URL}/purchase_user/${id}`, {
      method: 'GET',
      
  });
  return response.json();
}


// Get all orders
export const getAllOrders = async (): Promise<OrderModel[]> => {
  try {
    const response = await axios.get<OrderModel[]>(`${BASE_URL}/purchase`);
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
