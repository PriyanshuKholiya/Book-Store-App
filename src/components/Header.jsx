import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import React from 'react';
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = user && user.isAdmin;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Book Store Logo" />
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-books" className={({ isActive }) => (isActive ? "active" : "")}>
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
              Cart
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                  Profile
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink to="/admin-dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontWeight: 500 }}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;