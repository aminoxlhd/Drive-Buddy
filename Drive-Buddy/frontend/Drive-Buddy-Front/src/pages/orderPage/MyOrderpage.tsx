import { useState, useEffect } from 'react';
import './OrderPage.scss';
import {OrderModel} from '../../services/orders/orders'
import {getOrderByUserId} from '../../services/orders/ordersService'
import  OrderList  from '../../components/orderList/orderList'
const MyOrderPage = () => {

    const [orders, setOrders] = useState<OrderModel[]>([{
        id: '1',
        studentId: '1',
        vehiculeId: '1',
        teacherId : '1',
        category: 'SUV',
        date: '2024-07-13',
        createdAt : '2024-07-01',
        address: '123 Main St',
        price : '100',
        status : 'Accepted',
        hour : '10:00'
    }])

    useEffect(() => {
        getOrderByUserId().then(res => {
            setOrders(res)}
        ).catch(e => console.log(e))
    }, [])




    return (
        <div className="container">
            <div className="my-order-page">
                <h1>My Orders</h1>
                <OrderList orders={orders} />

            </div>
        </div>
    );
};

export default MyOrderPage;
