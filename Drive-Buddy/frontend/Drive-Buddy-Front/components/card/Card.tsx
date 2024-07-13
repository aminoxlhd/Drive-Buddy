import React from 'react';
import './card.scss';

interface CardProps {
    image: string;
    categoryType: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ image, categoryType, price }) => (
    <div className="card" style={{ backgroundImage: `url(${image})` }}>
        <div className="overlay">
            <h3>{categoryType}</h3>
            <p>Price: ${price.toFixed(2)}</p>
        </div>
    </div>
);

export default Card;
