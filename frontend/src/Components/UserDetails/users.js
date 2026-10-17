
import React, { useState, useEffect, useRef } from 'react';
import Nav from '../Nav/nav';
import axios from 'axios';
import User from '../Users/user';
import { useReactToPrint } from 'react-to-print';
import './users.css';

const URL = "http://localhost:5005/users";

const fetchHandler = async () => {
  const response = await axios.get(URL);
  return response.data;
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  const ComponentsRef = useRef(null);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        setUsers(data.users || []);
        setError("");
      })
      .catch((err) => {
        console.error("Fetch users error:", err);
        setError("Unable to load users. Please check your backend.");
      });
  }, []);

  const handleSearchChange = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchHandler();
      const allUsers = data.users || [];
      const query = searchQuery.trim().toLowerCase();

      const filteredUsers = allUsers.filter((user) =>
        [user.name, user.gmail, user.age, user.address, user._id]
          .some((field) =>
            String(field ?? "").toLowerCase().includes(query)
          )
      );

      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
      setError("");
    } catch (err) {
      console.error("Search error:", err);
      setError("Unable to search users.");
    }
  };

  const handleReset = async () => {
    setSearchQuery("");
    setNoResults(false);

    try {
      const data = await fetchHandler();
      setUsers(data.users || []);
      setError("");
    } catch (err) {
      console.error("Fetch users error:", err);
      setError("Unable to load users.");
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: ComponentsRef,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("Users Report printed successfully")
  });

  return (
    <div className="users-page">
      <Nav />

      <main className="users-content">
        <div className="users-heading">
          <div>
            <h1>User Details</h1>
            <p>View, search, and manage your user records.</p>
          </div>

          <span className="users-count">
            {users.length} {users.length === 1 ? 'User' : 'Users'}
          </span>
        </div>

        <form className="user-search" onSubmit={handleSearchChange}>
          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, age, or address..."
              aria-label="Search users"
            />
          </div>

          <button type="submit" className="search-btn">
            Search
          </button>

          {searchQuery && (
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Clear
            </button>
          )}
        </form>

        {error && <p className="users-error">{error}</p>}

        {!error && noResults && (
          <div className="no-results">
            <h2>No users found</h2>
            <p>Try another name, email, age, or address.</p>
            <button type="button" onClick={handleReset}>
              Show All Users
            </button>
          </div>
        )}

        {!error && !noResults && (
          <div className="users-grid" ref={ComponentsRef}>
            {users.map((user) => (
              <User key={user._id} user={user} />
            ))}

            {users.length === 0 && (
              <p>No users available yet.</p>
            )}
          </div>
        )}

        <div className="report-actions">
          <button
            type="button"
            className="report-btn"
            onClick={handlePrint}
          >
            Download Report
          </button>
        </div>
      </main>
    </div>
  );
}

export default Users;
