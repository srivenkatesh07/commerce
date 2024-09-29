import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const totalAmount = cart.reduce((total, item) => {
    return total + (item.sellingPrice || 0) * (item.quantity || 0);
  }, 0);

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.productId}>
            <h3>{item.productName}</h3>
            <p>Price: ${item.sellingPrice}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
      <h3>Total: ${totalAmount}</h3>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
