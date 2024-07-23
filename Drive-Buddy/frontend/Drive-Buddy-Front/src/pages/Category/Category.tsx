import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Category.scss';
import { getAllVehicules } from '../../services/vehicule/VehiculeService'
// import defaultAvatar from '../../assets/Avatar-aissa.png';

const categories = ['All', 'Category A', 'Category B', 'Category C', 'Category D'];
const cars = await getAllVehicules()


const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filterCars = (category: string) => {
        if (category === 'All') {
            console.log(cars)
            return cars;
        } else {
            return cars.filter((car: { category: string; }) => car.category === category);
        }
    };

    return (
        <div className="category-container">
            <div className="category-selection">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={category === selectedCategory ? 'active' : ''}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="car-list">
                {filterCars(selectedCategory).map(car => (
                    <div key={car.id} className="car-card">
                        <Link to={`/car-details/${car.id}`} className="car-card-link">
                            <img src={car.imageUrl} alt={car.title} />
                            <div className="car-details">
                                <div className="car-category">{car.category}</div>
                                <div className="car-title">{car.title}</div>
                                <div className="car-rating">⭐ {car.rating}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
