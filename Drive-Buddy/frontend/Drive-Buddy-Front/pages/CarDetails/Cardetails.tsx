import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Cardetails.scss';
import carBackground from '../../assets/carBackground.jpg'; // Sample image
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import Card from '../../components/card/Card';
import { initiatePayment } from '../../services/payment/payments'; // Import the payment function
import { getVehicule } from '../../services/vehicule/VehiculeService'
import { VehiculeModel } from '../../services/vehicule/Vehicule';


const recommendedCars = [
    { id: 1, imageUrl: carBackground, category: 'Category A', rating: 4.9 },
    { id: 2, imageUrl: carBackground, category: 'Category B', rating: 4.8 },
    { id: 3, imageUrl: carBackground, category: 'Category C', rating: 4.7 },
];

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState<VehiculeModel>({
        id : 1,
        imageUrl: carBackground,
        title: 'Clio 4',
        category: 'Category B',
        rating: 4.9,
        ownerName: 'Younes Drissi',
        location: '23 avenue de marseille - France',
        price: "100", // Sample price, adjust as needed
    })
    
    useEffect(() => {
        getVehicule(id).then(res => setCar(res)).catch(e => console.log(e))
    })
    



    // Function to handle PayPal payment
    const handlePayPalPayment = async () => {
        const paymentData = {
            id: 'your_payment_id', // Generate a unique payment ID
            studentId: 'your_student_id', // Fetch the actual student ID
            teacherId: 'your_teacher_id', // Fetch the actual teacher ID
            category: car.category,
            price: car.price,
            date: new Date(),
        };

        const paymentInitiated = await initiatePayment(paymentData);
        if (paymentInitiated) {
            // Handle success (e.g., show success message, redirect to confirmation page)
            console.log('Payment initiated successfully');
        } else {
            // Handle failure (e.g., show error message)
            console.error('Payment initiation failed');
        }
    };

    // Function to handle Credit Card payment
    const handleCreditCardPayment = async () => {
        // Implement Credit Card payment logic
        console.log('Initiating Credit Card payment...');
        // Similar to PayPal payment, use initiatePayment function
    };

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
                            <p>Rating: {'⭐'.repeat(Math.floor(car.rating))} {car.rating}</p>
                        </div>
                    </div>
                    <div className="reservation-section">
                        <h3>Reserve a session</h3>
                        <input type="date" placeholder="Date" />
                        <input type="text" placeholder="Address" />
                        <input type="time" placeholder="Time" />
                        <button className="paypal-button" onClick={handlePayPalPayment}>PayPal</button>
                        <button className="credit-card-button" onClick={handleCreditCardPayment}>Debit or Credit Card</button>
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
