import axios from 'axios';
import { OrderModel, OrderRequest } from './orders'

const BASE_URL = "http://localhost:5000";


// Get order by ID
export const getOrderById = async (id: string | undefined): Promise<OrderModel> => {
  try {
    const response = await axios.get<OrderModel>(`${BASE_URL}/purchase/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching order');
  }
};

export const getOrderByUserId = async (): Promise<OrderModel> => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${BASE_URL}/purchase_user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  const responseJson = await response.data
  return responseJson;
}

export const getOrderByTeacher = async (): Promise<OrderModel[]> => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${BASE_URL}/purchase_teacher`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  const responseJson = await response.data
  return responseJson;
}

// Get all orders
export const getAllOrders = async (): Promise<OrderModel[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}/purchase`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  const responseJson = await response.data
  return responseJson;
};



export const deleteOrder = async (orderId : string): Promise<boolean> => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${BASE_URL}/purchase/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  return response.status == 200
};
// Create a new order
export const createOrder = async (order: OrderRequest): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post(`${BASE_URL}/purchase`, 
      order,
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

export const cancelOrder = async (orderId: string): Promise<boolean> => {
  try {
    const order = await getOrderById(orderId)
    if(order){
      const token = localStorage.getItem('token')
      order.status = 'Canceled'
      const response = await axios.put(`${BASE_URL}/purchase/${order.id}`, 
        order,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }, 
          withCredentials : true
        }
      );
      console.log(response.data)
      const responseOk = response.status == 200
      return responseOk
    }
    return false;
  } catch (error) {
    throw new Error('Error creating order');
  }
};


export const acceptOrder = async (orderId: string): Promise<boolean> => {
  try {
    const order = await getOrderById(orderId)
    if(order){
      const token = localStorage.getItem('token')
      order.status = 'Accepted'
      const response = await axios.put(`${BASE_URL}/purchase/${order.id}`, 
        order,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }, 
          withCredentials : true
        }
      );
      console.log(response.data)
      const responseOk = response.status == 200
      return responseOk
    }
    return false;
  } catch (error) {
    throw new Error('Error creating order');
  }
};
