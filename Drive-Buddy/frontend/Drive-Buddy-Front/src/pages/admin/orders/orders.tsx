import { useEffect, useState } from "react"
import OrdersList from "../../../components/orderListAdmin/orderList"
import { OrderModel } from "../../../services/orders/orders"
import { getAllOrders } from "../../../services/orders/ordersService"




export const OrdersPage = () => {

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
        status : 'Accepted'
    }])

    useEffect(() => {
        getAllOrders().then(res => {
            setOrders(res)}
        ).catch(e => console.log(e))
    }, [])



    
    return (
        <div className='container'>
            <div className="row justify-content-md-center">
                <h1 className="col-md-10">Orders</h1>
            </div>
            <OrdersList orders={orders} />

        </div>

    );
}