import React, { useState, useMemo, useEffect } from 'react';
import { Column, useTable } from 'react-table';
import './OrderPage.scss';
import {OrderModel} from '../../services/orders/orders'
import {getOrderByUserId} from '../../services/orders/ordersService'
import  OrderList  from '../../components/orderList/orderList'
const MyOrderPage = () => {
    const id = "1"
    const [user, setUser] = useState({
        isLoggedIn: true,
        type: 'student', // 'student' or 'teacher'
        avatarUrl: 'path/to/avatar.jpg',
    });

    const [orders, setOrders] = useState<OrderModel[]>([{
        id: '1',
        studentId: '1',
        vehiculeId: '1',
        teacherId : '1',
        category: 'SUV',
        date: '2024-07-13',
        createdAt : '2024-07-01',
        address: '123 Main St',
        price : '100'
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
