
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './user.css';

function User(props) {
  const { _id, name, gmail, age, address } = props.user;

  const deletehandler = async () => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${_id}`);
      window.location.href = "/userdetails";
    } catch (error) {
      console.log(
        "Delete error:",
        error.response?.data || error.message
      );
      alert("Unable to delete user. Please try again.");
    }
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>

        <div>
          <h2 className="user-name">{name}</h2>
          <p className="user-email">{gmail}</p>
        </div>
      </div>

      <div className="user-details">
        <div className="detail-row">
          <span>User ID</span>
          <strong>{_id}</strong>
        </div>

        <div className="detail-row">
          <span>Age</span>
          <strong>{age}</strong>
        </div>

        <div className="detail-row">
          <span>Address</span>
          <strong>{address}</strong>
        </div>
      </div>

      <div className="user-actions">
        <Link
          className="update-btn"
          to={`/userdetails/${_id}`}
        >
          Update
        </Link>

        <button
          className="delete-btn"
          onClick={deletehandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default User;
