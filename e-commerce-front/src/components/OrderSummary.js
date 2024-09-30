import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css'; // Import the CSS for styling

const OrderSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <p className="no-order-message">No order details found.</p>;
  }

  const { address, paymentMethod, products } = state;

  const totalAmount = products.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  return (
    <div className="order-summary-container">
      <h2>Purchased Summary</h2>
      <h3>Customer Details</h3>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <h3>Items Ordered</h3>
      <ul className="ordered-items-list">
        {products.map((item) => (
          <li key={item.productId} className="ordered-item">
            {item.productName} - ${item.sellingPrice.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <h4 className="total-amount"><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</h4>
      
      <button className="go-to-products-button" onClick={() => navigate('/products')}>
      Go to Product Page
      </button>
    </div>
  );
};

export default OrderSummary;
