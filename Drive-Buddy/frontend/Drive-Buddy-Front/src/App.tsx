import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from "../components/Navbar/Nav";
import Home from '../pages/home-page/home';
import ExplorePage from '../pages/explore-page/explore-page';
import BuddyCarPage from '../pages/buddy-car-page/buddy-car';
import MyOrderPage from '../pages/orderPage/MyOrderpage';
import CarDetails from '../pages/CarDetails/Cardetails';
import MyCar from '../pages/myCar/Mycar';
import TeacherSignup from '../pages/Signup/TeacherSignup';
import Prices from '../pages/Prices/Prices';
import ContactUs from '../pages/ContactUs/ContactUs';
import Category from '../pages/Category/Category';
import Login from '../pages/Login/Login';
import StudentSignup from '../pages/Signup/StudentSignup';
import Profile from '../pages/profiles/Profile';
import Settings from '../pages/settings/Settings';

const sampleCar = {
  id: '1',
  imageUrl: 'path/to/carImage.jpg',
  title: 'Sample Car',
  category: 'Category A',
  ownerName: 'John Doe',
  location: '123 Main St, Anytown, USA',
};

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/buddy-car" element={<BuddyCarPage />} />
        <Route path="/myorder" element={<MyOrderPage />} />
        <Route path="/mycar" element={<MyCar />} />
        <Route path="/become-a-teacher" element={<TeacherSignup />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/StudentSignup" element={<StudentSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
