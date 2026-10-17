
import React from 'react';
import Nav from '../Nav/nav';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddUser.css';

function AddUser() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendRequest();
      alert("User added successfully");
      history('/userdetails');
    } catch (error) {
      console.error(
        "Add user error:",
        error.response?.data || error.message
      );
      alert("Unable to add user");
    }
  };

  const sendRequest = async () => {
    const response = await axios.post(
      "http://localhost:5005/users",
      {
        name: inputs.name,
        gmail: inputs.gmail,
        age: Number(inputs.age),
        address: inputs.address
      }
    );

    return response.data;
  };

  return (
    <div className="add-user-page">
      <Nav />

      <main className="add-user-container">
        <div className="add-user-header">
          <div className="add-user-icon">＋</div>
          <h1>Add New User</h1>
          <p>Enter the details below to create a user record.</p>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="add-user-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Enter user's name"
              required
            />
          </div>

          <div className="add-user-field">
            <label htmlFor="gmail">Email Address</label>
            <input
              id="gmail"
              type="email"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              placeholder="Enter user's email"
              required
            />
          </div>

          <div className="add-user-field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              min="1"
              value={inputs.age}
              onChange={handleChange}
              placeholder="Enter user's age"
              required
            />
          </div>

          <div className="add-user-field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              placeholder="Enter user's address"
              required
            />
          </div>

          <button type="submit" className="add-user-submit">
            Add User
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddUser;
