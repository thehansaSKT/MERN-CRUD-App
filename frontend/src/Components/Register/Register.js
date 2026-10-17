
import React from 'react';
import Nav from '../Nav/nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const history = useNavigate();

  const [user, setUser] = React.useState({
    name: "",
    gmail: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendRequest();
      alert("User Registered Successfully");
      history("/userdetails");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message ||
        "Registration failed"
      );
    }
  };

  const sendRequest = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/register`,
      {
        name: user.name,
        gmail: user.gmail,
        password: user.password
      }
    );

    return response.data;
  };

  return (
    <div className="register-page">
      <Nav />

      <main className="register-container">
        <div className="register-header">
          <div className="register-icon">👤</div>
          <h1>Create Account</h1>
          <p>Enter your details to create a new account.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
            required
          />

          <label htmlFor="gmail">Email Address</label>
          <input
            id="gmail"
            type="email"
            name="gmail"
            value={user.gmail}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Create a password"
            autoComplete="new-password"
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="register-footer">
          Already have an account?{' '}
          <a href="/log">Login here</a>
        </p>
      </main>
    </div>
  );
}

export default Register;
