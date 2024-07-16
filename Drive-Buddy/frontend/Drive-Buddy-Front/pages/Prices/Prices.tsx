// Prices.tsx

import React from 'react';
import './Prices.scss';
import sampleCarImage from '../../assets/clio.jpg';
import busImage from '../../assets/ghazala.png';
import truck from '../../assets/truck.png';
import kamio from '../../assets/kamio.png';

const Prices: React.FC = () => {
    const prices = [
        { id: 1, category: 'Category A', price: '$50 per hour', imageUrl: sampleCarImage },
        { id: 2, category: 'Category D', price: '$60 per hour', imageUrl: busImage },
        { id: 3, category: 'Category C', price: '$70 per hour', imageUrl: kamio },
        { id: 4, category: 'Category B', price: '$80 per hour', imageUrl: truck  },
    ];

    return (
        <div className="prices-container">
            <h2>Prices</h2>
            <div className="price-list">
                {prices.map(price => (
                    <div key={price.id} className="price-card">
                        <img src={price.imageUrl} alt={price.category} className="category-image" />
                        <div className="category">{price.category}</div>
                        <div className="price">{price.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Prices;
