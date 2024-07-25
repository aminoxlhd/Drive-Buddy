import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cardetails.scss';
import carBackground from '../../assets/carBackground.jpg'; // Sample image
import 'swiper/swiper-bundle.css';
import { getVehicule } from '../../services/vehicule/VehiculeService'
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { createOrder } from '../../services/orders/ordersService';




const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState<VehiculeModel>({
        id : "1",
        imageUrl: carBackground,
        title: 'Clio 4',
        category: 'Category B',
        rating: "4.9",
        ownerName: 'Younes Drissi',
        location: '23 avenue de marseille - France',
        price: "100", // Sample price, adjust as needed
    })
    
    const [orderRequest, setOrderRequest] = useState({
        dateOrder : '',
        timeOrder : '',
    })

    useEffect(() => {
        getVehicule(id).then(res => setCar(res)).catch(e => console.log(e))
    }, [])
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderRequest({ ...orderRequest, [e.target.name]: e.target.value });
      };


    const handlePurchase = async () => {
        createOrder({
            id : '6',
            vehiculeId : car.id.toString(),
            category : car.category,
            price : car.price,
            address : car.location,
            date : orderRequest.dateOrder,
            hour : orderRequest.timeOrder,
            createdAt : new Date().toDateString()

        }).then((created) => {
            if(created){
                window.location.href = '/myorder'
            }else{
                //TODO show error message
            }
        }).catch((e) => {
            console.error(e)
        })
    }


    return (
        <div className="container">
            <div className="car-details-container">
                <h2>Driver buddy details</h2>
                <div className="car-details-content">
                    <div className="car-image-section">
                        <img src={car.imageUrl} alt={car.title} className="car-image" />
                        <div className="car-info">
                            <h3>{car.title}</h3>
                            <p>{car.category}</p>
                            <p>{car.ownerName}</p>
                            <p>{car.location}</p>
                            <p>Rating: {'⭐'.repeat(Math.floor(Number(car.rating)))} {car.rating}</p>
                        </div>
                    </div>
                    <div className="reservation-section">
                        <h3>Reserve a session</h3>
                        <input name="dateOrder" type="date" placeholder="Date" value={orderRequest.dateOrder} onChange={handleChange}/>
                        <input type="text" placeholder="Address" disabled value={car.location}/>
                        <input name="timeOrder" type="time" placeholder="Time" value={orderRequest.timeOrder} onChange={handleChange}/>
                        <button className="paypal-button" onClick={handlePurchase}>Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
