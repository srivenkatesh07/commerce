import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };
  const itemCount = getTotalItems();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>

        {/* Admin Links */}
        {user?.role === "admin" && (
          <>
            <li className="navbar-item">
              <Link to="/userList">User List</Link>
            </li>
            <li className="navbar-item">
              <Link to="/products">Product List</Link>
            </li>
            <li className="navbar-item">
              <Link to="/product">Add Products</Link>
            </li>
          </>
        )}

        {/* Customer Links */}
        {user?.role !== "admin" && user && (
          <>
            <li className="navbar-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="navbar-item">
              <Link to="/purchasedList">Purchased List</Link>
            </li>
            <li className="navbar-item">
              <Link to="/cart">Cart {itemCount > 0 && `(${itemCount})`}</Link>
            </li>
          </>
        )}

        {/* common Links */}
        <li className="navbar-item auth-links">
          {user ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/signup" className="auth-link">Signup</Link>
            </>
          )}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
