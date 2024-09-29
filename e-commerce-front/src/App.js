import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import ProductCreate from './components/ProductCreate';
import UpdateProduct from './components/UpdateProduct';

import Navbar from './components/Navbar'; 
import PurchasedList from './components/PurchasedList';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            <Navbar/>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/product" element={<ProductCreate />} />
              <Route path="/purchasedList" element={<PurchasedList />} />
              <Route path="/updateProduct/:productId" element={<UpdateProduct />} />
              <Route path="/" element={<Home token={token} />} />
              
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
