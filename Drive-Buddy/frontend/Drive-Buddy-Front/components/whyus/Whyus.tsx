import React from 'react';
import './whyus.scss';
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineHandshake } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const cards = [
    {
        icon: <TbCategoryFilled />,
        title: 'High Quality Work',
        description: 'Get results from skilled drivers from all over the country, for every task, at any price point.'
    },
    {
        icon: <MdOutlineHandshake />,
        title: 'Clear, upfront pricing',
        description: 'No hourly rates, just project-based pricing. Payments only get released when you approve.'
    },
    {
        icon: <BiSupport />,
        title: '24/7 Support',
        description: 'We offer 24/7 support to assist you at any time.'
    }
];

const WhyUs: React.FC = () => (
    <section className="why-us">
        <h2 className="why-us-title">A whole world of freelance talent at your fingertips</h2>
        <div className="cards-container">
            {cards.map((card, index) => (
                <div className="card" key={index}>
                    <div className="icon" role="img" aria-label={card.title}>{card.icon}</div>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                </div>
            ))}
        </div>
    </section>
);

export default WhyUs;
