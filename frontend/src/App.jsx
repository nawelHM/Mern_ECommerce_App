import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Collection from './pages/Collection';
import Register from './pages/Register';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer  from "./components/Footer";
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartTotal from './components/CartTotal';

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/carttotal" element={<CartTotal />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
