import { Link } from 'react-router-dom';
import './CardExplore.scss';
interface CardExploreProps {
    id: string | number; 
    imageUrl: string;
    title: string;
    category: string;
    rating: number;
    ownerName: string;
    ownerPhoto: string;
    countryEmoji: string;
  }

const CardExplore = ({ id, imageUrl, title, category, rating, ownerName, ownerPhoto, countryEmoji } : CardExploreProps) => (
    <div className="card-explore">
        <Link to={`/car-details/${id}`}>
            <div className="image-container">
                <img src={imageUrl} alt={title} className="car-image" />
                <div className="owner-info">
                    <img src={ownerPhoto} alt={ownerName} className="owner-photo" />
                    <div className="owner-details">
                        <span>{ownerName}</span>
                        <span>{countryEmoji}</span>
                    </div>
                </div>
            </div>
            <div className="card-details">
                <h3 className="card-title">{title}</h3>
                <p className="card-category">Category: {category}</p>
                <p className="card-rating">Rating: {'⭐'.repeat(rating)} ({rating})</p>
            </div>
        </Link>
    </div>
);

export default CardExplore;
