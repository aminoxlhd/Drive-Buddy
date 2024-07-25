import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cardetails.scss';
import carBackground from '../../assets/carBackground.jpg'; // Sample image
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import Card from '../../components/card/Card';
import { getVehicule } from '../../services/vehicule/VehiculeService'
import { VehiculeModel } from '../../services/vehicule/Vehicule';
import { createOrder } from '../../services/orders/ordersService';


const recommendedCars = [
    { id: 1, imageUrl: carBackground, category: 'Category A', rating: 4.9 },
    { id: 2, imageUrl: carBackground, category: 'Category B', rating: 4.8 },
    { id: 3, imageUrl: carBackground, category: 'Category C', rating: 4.7 },
];

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
                <h3>Recommended</h3>
                <Swiper modules={[Navigation, Pagination]}
                    slidesPerView={2}
                    spaceBetween={16}
                    pagination={{ clickable: true }}
                    navigation>
                    {recommendedCars.map(car => (
                        <SwiperSlide key={car.id}>
                            <Card
                                image={car.imageUrl}
                                categoryType={car.category}
                                price={car.rating}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CarDetails;
