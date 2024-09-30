import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext';
import './PurchasedList.css'; // Import CSS for styling

const PurchasedList = () => {
  const { user } = useAuth(); 
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const response = await axios.get('/api/purchases', {
          params: { userId: user.id }
        });
       
        const allProducts = response.data.flatMap(purchase => 
          purchase.products.map(product => ({
            ...product,
            createdAt: purchase.createdAt,
            userId: user ? user.id : 'Not available' 
          }))
        );

        setPurchasedItems(allProducts);
      } catch (err) {
        setError('Failed to fetch purchased items.');
      } finally {
        setLoading(false);
      }
    };

    if (user) { 
      fetchPurchasedItems();
    } else {
      setLoading(false); 
      setError('User not logged in.'); 
    }
  }, [user]); 

  if (loading) return <p>Loading purchased items...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="purchased-list-container">
      <h2>Your Purchased Items</h2>
      {purchasedItems.length === 0 ? (
        <p>No purchased items found.</p>
      ) : (
        <ul className="purchased-items-list">
          {purchasedItems.map(item => (
            <li key={`${item.productId}-${item.quantity}`} className="purchased-item"> 
              <h3>{item.productName}</h3>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${item.sellingPrice ? item.sellingPrice.toFixed(2) : '0.00'}</p>
              <p><strong>Total:</strong> ${(item.sellingPrice && item.quantity) ? (item.sellingPrice * item.quantity).toFixed(2) : '0.00'}</p>
              <p><strong>Purchased Date:</strong> {new Date(item.createdAt).toLocaleString()}</p> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchasedList;
