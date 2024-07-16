import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Category.scss';
import sampleCarImage from '../../assets/clio.jpg';
import busImage from '../../assets/ghazala.png';
import kamio from '../../assets/kamio.png';
import truck from '../../assets/truck.png';
// import defaultAvatar from '../../assets/Avatar-aissa.png';

const categories = ['All', 'Category A', 'Category B', 'Category C', 'Category D'];
const cars = [
    { id: 1, category: 'Category A', title: 'clio 1', rating: 4.9, imageUrl: sampleCarImage },
    { id: 2, category: 'Category A', title: 'clio 2', rating: 4.9, imageUrl: sampleCarImage },
    { id: 3, category: 'Category A', title: 'clio 3', rating: 4.9, imageUrl: sampleCarImage },
    { id: 4, category: 'Category A', title: 'clio 4', rating: 4.9, imageUrl: sampleCarImage },
    { id: 5, category: 'Category A', title: 'clio 5', rating: 4.9, imageUrl: sampleCarImage },
    { id: 6, category: 'Category A', title: 'clio 6', rating: 4.9, imageUrl: sampleCarImage },
    { id: 7, category: 'Category A', title: 'clio 7', rating: 4.9, imageUrl: sampleCarImage },
    { id: 8, category: 'Category A', title: 'clio 8', rating: 4.9, imageUrl: sampleCarImage },
    { id: 9, category: 'Category D', title: 'bus 1', rating: 4.9, imageUrl: busImage },
    { id: 10, category: 'Category D', title: 'bus 2', rating: 4.9, imageUrl: busImage },
    { id: 11, category: 'Category D', title: 'bus 3', rating: 4.9, imageUrl: busImage },
    { id: 12, category: 'Category D', title: 'bus 4', rating: 4.9, imageUrl: busImage },
    { id: 13, category: 'Category D', title: 'bus 5', rating: 4.9, imageUrl: busImage },
    { id: 14, category: 'Category C', title: 'bus 1', rating: 4.9, imageUrl: kamio },
    { id: 15, category: 'Category C', title: 'bus 2', rating: 4.9, imageUrl: kamio },
    { id: 16, category: 'Category C', title: 'bus 3', rating: 4.9, imageUrl: kamio },
    { id: 17, category: 'Category C', title: 'bus 4', rating: 4.9, imageUrl: kamio },
    { id: 18, category: 'Category C', title: 'bus 5', rating: 4.9, imageUrl: kamio },
    { id: 19, category: 'Category C', title: 'bus 1', rating: 4.9, imageUrl: kamio },
    { id: 20, category: 'Category C', title: 'bus 2', rating: 4.9, imageUrl: kamio },
    { id: 21, category: 'Category B', title: 'bus 3', rating: 4.9, imageUrl: truck },
    { id: 22, category: 'Category B', title: 'bus 4', rating: 4.9, imageUrl: truck },
    { id: 23, category: 'Category B', title: 'bus 5', rating: 4.9, imageUrl: truck },
    { id: 24, category: 'Category B', title: 'bus 4', rating: 4.9, imageUrl: truck },
    { id: 25, category: 'Category B', title: 'bus 5', rating: 4.9, imageUrl: truck },
    { id: 26, category: 'Category B', title: 'bus 1', rating: 4.9, imageUrl: truck },
    { id: 27, category: 'Category B', title: 'bus 2', rating: 4.9, imageUrl: truck },
    { id: 28, category: 'Category D', title: 'bus 3', rating: 4.9, imageUrl: busImage },
    { id: 29, category: 'Category D', title: 'bus 4', rating: 4.9, imageUrl: busImage },
    { id: 30, category: 'Category D', title: 'bus 5', rating: 4.9, imageUrl: busImage },
];

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filterCars = (category) => {
        if (category === 'All') {
            return cars;
        } else {
            return cars.filter(car => car.category === category);
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
