import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  if (!state) {
    return <p>No order details found.</p>;
  }

  const {  address, paymentMethod, products } = state;

  const totalAmount = products.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  return (
    <div>
      <h2>Purchased Summary</h2>
      <h3>Customer Details</h3>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <h3>Items Ordered</h3>
      <ul>
        {products.map((item, index) => (
          <li key={item.productId}> 
            {item.productName} - ${item.sellingPrice.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <h4><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</h4>
      
      <button onClick={() => navigate('/products')}>Go to Products</button>
    </div>
    
  );
};

export default OrderSummary;
