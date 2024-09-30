import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (!Array.isArray(cart) || cart.length === 0) {
    return <p className="empty-cart-message">Your cart is empty.</p>;
  }

  const totalAmount = cart.reduce((total, item) => {
    return total + (item.sellingPrice || 0) * (item.quantity || 0);
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.productId} className="cart-item">
            <h3>{item.productName}</h3>
            <p>Price: ${item.sellingPrice.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.productId)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
      <h3 className="total-amount">Total: ${totalAmount.toFixed(2)}</h3>
      <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
