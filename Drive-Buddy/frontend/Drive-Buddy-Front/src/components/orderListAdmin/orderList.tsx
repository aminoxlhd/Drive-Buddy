import { useState } from 'react';
import { OrderModel } from '../../services/orders/orders';
import { deleteOrder } from '../../services/orders/ordersService';

interface OrdersListProps {
  orders: OrderModel[];
}

const OrdersList = ({ orders }: OrdersListProps) => {
  const [message, setMessage] = useState("")
  
  const deleteOrderBtn = (orderId : string) => {
    deleteOrder(orderId).then(res => {
        if(res){
            setMessage("Order deleted.")
            window.location.href = '/purchases'
        }
    })
  }
  return (
    <>
    { message != "" && <h5 className="alert alert-success" style={{color : 'green'}}>{message}</h5>}
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Adress</th>
          <th>Price</th>
          <th>Status</th>
          <th>Created At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>{order.address}</td>
            <td>{order.price}</td>
            <td>{order.status}</td>
            <td>{order.createdAt}</td>

            <td><button className="btn btn-danger" onClick={() => deleteOrderBtn(order.id)} >Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
   
  );
};

export default OrdersList;
