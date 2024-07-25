import { useState } from 'react';
import './explore-page.scss';
import CardExplore from '../../components/CardExplore/CardExplore';
import carBackground from '../../assets/carBackground.jpg';

const allCards = [
    {
        id: '1',
        imageUrl: carBackground,
        title: 'Car Model 1',
        category: 'Category A',
        rating: 4,
        ownerName: 'Younes',
        ownerPhoto: 'path/to/owner1.jpg',
        countryEmoji: '🇺🇸',
    },
    {
        id: '2',
        imageUrl: carBackground,
        title: 'Clio 4',
        category: 'Category B',
        rating: 5,
        ownerName: 'Aissa',
        ownerPhoto: 'path/to/owner2.jpg',
        countryEmoji: '🇬🇧',
    },
];

const ExplorePage = () => {
    const [category, setCategory] = useState('All');

    const filteredCards = category === 'All' ? allCards : allCards.filter(card => card.category === category);

    return (
        <div className="container">
            <div className="filter-buttons">
                {['All', 'Category A', 'Category B', 'Category C', 'Category D'].map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)}>
                        {cat}
                    </button>
                ))}
            </div>
            <div className="cards-container">
                {filteredCards.map((card, index) => (
                    <CardExplore key={index} {...card} />
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
