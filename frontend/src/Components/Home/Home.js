
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/nav';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <Nav />

      <main className="home-content">
        <section className="hero-section">
          <span className="hero-label">USER MANAGEMENT SYSTEM</span>

          <h1>Manage Your Users<br />With Ease</h1>

          <p>
            Add, view, update, and manage user information
            from one simple dashboard.
          </p>

          <div className="hero-actions">
            <Link to="/adduser" className="home-primary-btn">
              + Add New User
            </Link>

            <Link to="/userdetails" className="home-secondary-btn">
              View All Users
            </Link>
          </div>
        </section>

        <section className="home-features">
          <Link to="/adduser" className="feature-card">
            <div className="feature-icon add-icon">+</div>
            <h2>Add Users</h2>
            <p>Create a new user profile and enter their details.</p>
          </Link>

          <Link to="/userdetails" className="feature-card">
            <div className="feature-icon view-icon">☷</div>
            <h2>View Users</h2>
            <p>Browse and manage your existing user records.</p>
          </Link>

          <Link to="/regi" className="feature-card">
            <div className="feature-icon register-icon">↗</div>
            <h2>Register</h2>
            <p>Create a new account using the registration form.</p>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Home;
