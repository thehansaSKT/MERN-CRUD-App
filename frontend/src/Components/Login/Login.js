
import React from 'react';
import Nav from '../Nav/nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const history = useNavigate();

  const [user, setUser] = React.useState({
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
      const response = await sendRequest();

      if (response.status === "ok") {
        alert("Login Success");
        history("/userdetails");
      } else {
        alert(response.err || "Login Error");
      }
    } catch (err) {
      alert(
        err.response?.data?.err ||
        err.response?.data?.message ||
        err.message
      );
    }
  };

  const sendRequest = async () => {
    const response = await axios.post(
      "http://localhost:5005/login",
      {
        gmail: user.gmail,
        password: user.password
      }
    );

    return response.data;
  };

  return (
    <div className="login-page">
      <Nav />

      <main className="login-container">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1>User Login</h1>
          <p>Welcome back! Enter your details to continue.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <a href="/regi">Register here</a>
        </p>
      </main>
    </div>
  );
}

export default Login;
