import axios from 'axios';
import { OrderModel, OrderRequest } from './orders'

const BASE_URL = "http://localhost:5000";


// Get order by ID
export const getOrderById = async (id: string | undefined): Promise<OrderModel> => {
  try {
    const response = await axios.get<OrderModel>(`${BASE_URL}/purchase/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching order');
  }
};

export const getOrderByUserId = async (): Promise<OrderModel> => {
  let token = localStorage.getItem('token')

  const response = await axios.get(`${BASE_URL}/purchase_user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  let responseJson = await response.data
  return responseJson;
}

export const getOrderByTeacher = async (): Promise<OrderModel> => {
  let token = localStorage.getItem('token')

  const response = await axios.get(`${BASE_URL}/purchase_teacher`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  let responseJson = await response.data
  return responseJson;
}

// Get all orders
export const getAllOrders = async (): Promise<OrderModel[]> => {
  let token = localStorage.getItem('token')
  const response = await axios.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials : true
  });

  let responseJson = await response.data
  return responseJson;
};



export const deleteOrder = async (orderId : string): Promise<boolean> => {
  let token = localStorage.getItem('token')
  const response = await axios.delete(`${BASE_URL}/${orderId}`, {
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
    let token = localStorage.getItem('token')
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
    throw new Error(error.response?.data?.message || 'Error creating order');
  }
};

export const cancelOrder = async (orderId: string): Promise<boolean> => {
  try {
    let order = await getOrderById(orderId)
    if(order){
      let token = localStorage.getItem('token')
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
    throw new Error(error.response?.data?.message || 'Error creating order');
  }
};


export const acceptOrder = async (orderId: string): Promise<boolean> => {
  try {
    let order = await getOrderById(orderId)
    if(order){
      let token = localStorage.getItem('token')
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
