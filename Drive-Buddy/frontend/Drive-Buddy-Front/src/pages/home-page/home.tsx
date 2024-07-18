import React from 'react';
import './home.scss';
import HeroSection from "../../components/herosection/HeroSection";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import WhyUs from "../../components/whyus/Whyus";

const Home: React.FC = () => (
  <div className="container">
    <HeroSection />
    <CategoriesSection />
    <WhyUs />
  </div>
);

export default Home;
