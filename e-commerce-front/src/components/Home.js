import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = ({ token }) => {
  const { user } = useAuth();

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };  
  
    return (
      <div>
        <h1>Welcome to the E-commerce App</h1>
        {user ? (
          <div>
            <p>You are logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Please log in or sign up.</p>
        )}
      </div>
    );
  };
  

export default Home;
