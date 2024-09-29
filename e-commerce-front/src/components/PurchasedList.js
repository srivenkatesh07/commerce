import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; 
import { useAuth } from '../context/AuthContext';

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
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Purchased Items</h2>
      {purchasedItems.length === 0 ? (
        <p>No purchased items found.</p>
      ) : (
        <ul>
          {purchasedItems.map(item => (
            <li key={`${item.productId}-${item.quantity}`}> 
              <h3>{item.productName}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.sellingPrice ? item.sellingPrice.toFixed(2) : '0.00'}</p>
              <p>Total: ${(item.sellingPrice && item.quantity) ? (item.sellingPrice * item.quantity).toFixed(2) : '0.00'}</p>
              <p>Purchased Date: {new Date(item.createdAt).toLocaleString()}</p> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchasedList;
