import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [error, setError] = useState(''); 

  const handlePlaceOrder = async () => {
    const orderDetails = {
      userId: user.id,
      products: cart.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
      })),
      totalAmount: cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0),
      paymentMethod,
      address,
    };

    try {
      await Promise.all(
        cart.map(async item => {
          const response = await axios.get(`/api/products/${item.productId}`);
          const currentQuantity = response.data.quantity;
          const newQuantity = currentQuantity - item.quantity;
          if (newQuantity < 0) {
            throw new Error(`Not enough stock for ${item.productName}`);
          }
          await axios.put(`/api/products/${item.productId}`, { quantity: newQuantity });
        })
      );

      // Save the purchase details
      await axios.post('/api/purchases', orderDetails);
      console.log('Purchase recorded:', orderDetails);

      clearCart();

      navigate('/order-summary', { state: { ...orderDetails, cart } });
    } catch (error) {
      console.error('Error processing order:', error);
      setError('Failed to process your order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return <p className="empty-cart-message">Your cart is empty. Please add items to the cart.</p>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className="checkout-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Method:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <button type="submit" className="place-order-button">Place Order</button>
      </form>

      <h3>Your Cart:</h3>
      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.productId} className="cart-item">
            {item.productName} - ${item.sellingPrice.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <h4 className="total-amount">
        Total: ${cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0).toFixed(2)}
      </h4>
    </div>
  );
};

export default Checkout;
