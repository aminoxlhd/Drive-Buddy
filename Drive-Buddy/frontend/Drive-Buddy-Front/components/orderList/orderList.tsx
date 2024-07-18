import React from 'react';
import { OrderModel } from '../../services/orders/orders'

interface OrderListProps {
  orders: OrderModel[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.date}</td>
            <td>{order.vehiculeCategory}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
