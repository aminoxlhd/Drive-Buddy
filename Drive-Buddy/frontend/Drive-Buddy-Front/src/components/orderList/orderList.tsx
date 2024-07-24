import React, { useState } from 'react';
import { OrderModel } from '../../services/orders/orders'
import { acceptOrder, cancelOrder } from '../../services/orders/ordersService';

interface OrderListProps {
  orders: OrderModel[];
}

const OrderList = ({ orders }: OrderListProps) => {
  let type = localStorage.getItem('type')
  const [message, setMessage] = useState("")

  const acceptOrderBtn = async (orderId : string) => {
    let accepted = await acceptOrder(orderId)
    if(accepted){
      setMessage('Order Accepted')
    }
  }


  const cancelOrderBtn = async (orderId : string) => {
    let canceled = await cancelOrder(orderId)
    if(canceled){
      setMessage('Order Canceled')
    }
  }

  return (
    <div>
      { message != "" && <h5 style={{color : 'green'}}>{message}</h5>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.category}</td>
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>{ type == "teacher" && <button onClick={() => acceptOrderBtn(order.id)}>Accept Order</button>}</td>
              <td><button onClick={() => cancelOrderBtn(order.id)} >Cancel Order</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default OrderList;
