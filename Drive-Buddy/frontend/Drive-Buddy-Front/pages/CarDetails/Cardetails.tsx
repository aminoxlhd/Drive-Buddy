import React from 'react';
import { useParams } from 'react-router-dom';
import './Cardetails.scss';
import carBackground from '../../assets/carBackground.jpg'; // Sample image
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import Card from '../../components/card/Card';

const recommendedCars = [
    { id: 1, imageUrl: carBackground, category: 'Category A', rating: 4.9 },
    { id: 2, imageUrl: carBackground, category: 'Category B', rating: 4.8 },
    { id: 3, imageUrl: carBackground, category: 'Category C', rating: 4.7 },
];

const CarDetails = () => {
    const { id } = useParams();

    // Sample data, replace with real data fetching
    const car = {
        id,
        imageUrl: carBackground,
        title: 'Clio 4',
        category: 'Category B',
        rating: 4.9,
        ownerName: 'Younes Drissi',
        ownerPhoto: 'path/to/owner.jpg',
        countryEmoji: '🇫🇷',
        location: '23 avenue de marseille - France',
    };



    return (
        <div className="container">
            <div className=".car-details-container">
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
                        <button className="paypal-button">PayPal</button>
                        <button className="credit-card-button">Debit or Credit Card</button>
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
