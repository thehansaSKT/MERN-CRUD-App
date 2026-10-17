
import React from 'react';
import './nav.css';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  return (
    <nav className="main-navbar">
      <Link to="/mainhome" className="navbar-brand">
        User<span>Manager</span>
      </Link>

      <ul className="home-ul">
        <li className="home-li">
          <Link
            to="/mainhome"
            className={`home-a ${location.pathname === '/mainhome' || location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>

        <li className="home-li">
          <Link
            to="/adduser"
            className={`home-a ${location.pathname === '/adduser' ? 'active' : ''}`}
          >
            Add User
          </Link>
        </li>

        <li className="home-li">
          <Link
            to="/userdetails"
            className={`home-a ${location.pathname === '/userdetails' ? 'active' : ''}`}
          >
            User Details
          </Link>
        </li>
      </ul>

      <div className="navbar-auth">
        <Link to="/log" className="login-link">
          Login
        </Link>

        <Link to="/regi" className="register-link">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
