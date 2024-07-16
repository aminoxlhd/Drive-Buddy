import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CategoriesSection.scss';
import Card from '../card/Card';

import carImage from '../../assets/clio4.png';
import ghazalaImagePng from '../../assets/ghazala.png';
import ghazalaImageJpg from '../../assets/ghazala.png';

const categories = [
    {
        image: carImage,
        categoryType: 'Category B',
        price: 50.00
    },
    {
        image: ghazalaImagePng,
        categoryType: 'Category C',
        price: 75.00
    },
    {
        image: ghazalaImageJpg,
        categoryType: 'Category D',
        price: 120.00
    },
    {
        image: ghazalaImageJpg,
        categoryType: 'Category E',
        price: 90.00
    }
];

const CategoriesSection: React.FC = () => (
    <div className="categories-section">
        <div>
            <h2 className="section-title">Explore Our Categories</h2>
        </div>
        <div className='categories-container'>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={2}
                spaceBetween={16}
                pagination={{ clickable: true }}
                navigation
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            image={category.image}
                            categoryType={category.categoryType}
                            price={category.price}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    </div>
);

export default CategoriesSection;
