
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateUser.css';

function UpdateUser() {
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: ""
  });

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/${id}`
        );

        setInputs(res.data.users);
      } catch (error) {
        console.error(
          "Fetch user error:",
          error.response?.data || error.message
        );
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    return await axios.put(
      `http://localhost:5005/users/${id}`,
      {
        name: inputs.name,
        gmail: inputs.gmail,
        age: Number(inputs.age),
        address: inputs.address
      }
    );
  };

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
      alert("User updated successfully");
      history('/userdetails');
    } catch (error) {
      console.error(
        "Update error:",
        error.response?.data || error.message
      );
      alert("Unable to update user");
    }
  };

  return (
    <div className="update-page">
      <div className="update-container">
        <div className="update-header">
          <div className="update-icon">✎</div>
          <h1>Update User</h1>
          <p>Modify the user's information below.</p>
        </div>

        <form className="update-form" onSubmit={handleSubmit}>
          <div className="update-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="update-field">
            <label htmlFor="gmail">Email Address</label>
            <input
              id="gmail"
              type="email"
              name="gmail"
              value={inputs.gmail}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="update-field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              name="age"
              min="1"
              value={inputs.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </div>

          <div className="update-field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="update-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => history('/userdetails')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
