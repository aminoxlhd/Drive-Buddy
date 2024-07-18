import React from 'react';
import './card.scss';

interface CardProps {
    image: string;
    categoryType: string;
    price: number;
    onClick: () => void; // Add onClick prop
}

const Card: React.FC<CardProps> = ({ image, categoryType, price, onClick }) => (
    <div className="card" style={{ backgroundImage: `url(${image})` }} onClick={onClick}>
        <div className="overlay">
            <h3>{categoryType}</h3>
            <p>Price: ${price.toFixed(2)}</p>
        </div>
    </div>
);

export default Card;
