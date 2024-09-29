import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
       {/* common */}
        <li style={{ marginRight: '20px' }}>
            <Link to="/">Home</Link>
        </li>

        {/* for admin */}
        <li style={{ marginRight: '20px' }}>
          {user !=undefined && user.role != undefined && user.role !=null && user.role == "admin" ? (
            <Link to="/product">Add Products</Link>
          ) : null}
        </li>

        <li style={{ marginRight: '20px' }}>
          {user !=undefined && user.role != undefined && user.role !=null && user.role == "admin" ? (
            <Link to="/products">Product List</Link>
          ) : null}
        </li>

        {/* for customers */}
        <li style={{ marginRight: '20px' }}>
          {user !=undefined && user.role != undefined && user.role !=null && user.role !== "admin" ? (
            <Link to="/products">Products</Link>
          ) : null}
        </li>

        <li style={{ marginRight: '20px' }}>
          {user !=undefined && user.role != undefined && user.role !=null && user.role !== "admin" ? (
            <Link to="/purchasedList">Purchased List</Link>
          ) : null}
        </li>

        <li style={{ marginRight: '20px' }}>
          {user !=undefined && user.role != undefined && user.role !=null && user.role !== "admin" ? (
            <Link to="/cart">Cart {itemCount > 0 && `(${itemCount})`}</Link>
          ) : null}
        </li>

        {/* common */}
        <li style={{ marginRight: '20px' }}>
          {user !=undefined && user.role !=undefined && user.role !=null && user.role !=='' ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : null}
        </li>

        <li style={{ marginRight: '20px' }}>
          {user ==undefined || user.role ==undefined || user.role ==null ? (
            <Link to="/login">login</Link>
          ) : null}
        </li>

        <li style={{ marginRight: '20px' }}>
          {user ==undefined || user.role == undefined || user.role ==null ? (
            <Link to="/signup">signup</Link>
          ) : null}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
