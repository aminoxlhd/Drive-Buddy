import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from "./components/Navbar/Nav";
import Home from './pages/home-page/home';
import ExplorePage from './pages/explore-page/explore-page';
import BuddyCarPage from './pages/buddy-car-page/buddy-car';
import MyOrderPage from './pages/orderPage/MyOrderpage';
import CarDetails from './pages/CarDetails/Cardetails';
import MyCar from './pages/myCar/Mycar';
import TeacherSignup from './pages/Signup/TeacherSignup';
import Prices from './pages/Prices/Prices';
import ContactUs from './pages/ContactUs/ContactUs';
import Category from './pages/Category/Category';
import Login from './pages/Login/Login';
import StudentSignup from './pages/Signup/StudentSignup';
import Profile from './pages/profiles/Profile';
import Settings from './pages/settings/Settings';
import MyCars from './pages/mycars/mycars';
import MyOrderPageTeacher from './pages/orderPageTeacher/MyOrderpage';
import { AdminLoginPage } from './pages/admin/admin';
import { TeachersPage } from './pages/admin/teachers/teachers';
import { StudentsPage } from './pages/admin/students/students';
import { OrdersPage } from './pages/admin/orders/orders';
import { CarsPage } from './pages/admin/cars/cars';

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
        <Route path="/myorder-teacher" element={<MyOrderPageTeacher />} />
        <Route path="/mycar/:id?" element={<MyCar />} />
        <Route path="/mycars/" element={<MyCars />} />
        <Route path="/become-a-teacher" element={<TeacherSignup />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/StudentSignup" element={<StudentSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminLoginPage/>}/>
        <Route path="/teachers" element={<TeachersPage/>}/>
        <Route path="/students" element={<StudentsPage/>}/>
        <Route path="/purchases" element={<OrdersPage/>}/>
        <Route path="/cars" element={<CarsPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
