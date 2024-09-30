import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome to the E-commerce App</h1>
      {user ? (
        <div className="user-info">
          <p className="status">You are logged in!</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="login-prompt">Please log in or sign up.</p>
      )}
    </div>
  );
};

export default Home;
