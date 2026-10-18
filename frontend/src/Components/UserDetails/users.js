import React, { useState, useEffect, useRef } from 'react';
import Nav from '../Nav/nav';
import axios from 'axios';
import User from '../Users/user';
import { useReactToPrint } from 'react-to-print';
import './users.css';

const URL = `${process.env.REACT_APP_API_URL}/users`;

const fetchHandler = async (retries = 2) => {
  try {
    const response = await axios.get(URL, {
      timeout: 60000,
    });

    return response.data;
  } catch (error) {
    console.error('Fetch users error:', error.message);

    if (retries > 0) {
      console.log(
        `Retrying request... ${retries} attempt(s) left`
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return fetchHandler(retries - 1);
    }

    throw error;
  }
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const ComponentsRef = useRef(null);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    setNoResults(false);

    try {
      const data = await fetchHandler();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Unable to load users:', err);

      setError(
        'Unable to load users. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearchChange = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setNoResults(false);

    try {
      const data = await fetchHandler();
      const allUsers = data.users || [];
      const query = searchQuery.trim().toLowerCase();

      const filteredUsers = allUsers.filter((user) =>
        [
          user.name,
          user.gmail,
          user.age,
          user.address,
          user._id,
        ].some((field) =>
          String(field ?? '').toLowerCase().includes(query)
        )
      );

      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to search users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setSearchQuery('');
    await loadUsers();
  };

  const handlePrint = useReactToPrint({
    contentRef: ComponentsRef,
    documentTitle: 'Users Report',
    onAfterPrint: () =>
      alert('Users Report printed successfully'),
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
            {users.length}{' '}
            {users.length === 1 ? 'User' : 'Users'}
          </span>
        </div>

        <form
          className="user-search"
          onSubmit={handleSearchChange}
        >
          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search by name, email, age, or address..."
              aria-label="Search users"
            />
          </div>

          <button
            type="submit"
            className="search-btn"
            disabled={loading}
          >
            Search
          </button>

          {searchQuery && (
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={loading}
            >
              Clear
            </button>
          )}
        </form>

        {}
        {loading && (
          <div className="users-loading">
            <p>Loading users... Please wait.</p>
          </div>
        )}

        {}
        {!loading && error && (
          <div className="users-error">
            <p>{error}</p>

            <button
              type="button"
              onClick={loadUsers}
              disabled={loading}
            >
              Retry
            </button>
          </div>
        )}

        {}
        {!loading && !error && noResults && (
          <div className="no-results">
            <h2>No users found</h2>
            <p>
              Try another name, email, age, or address.
            </p>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
            >
              Show All Users
            </button>
          </div>
        )}

        {}
        {!loading && !error && !noResults && (
          <div
            className="users-grid"
            ref={ComponentsRef}
          >
            {users.map((user) => (
              <User
                key={user._id}
                user={user}
              />
            ))}

            {users.length === 0 && (
              <p>No users available yet.</p>
            )}
          </div>
        )}

        {}
        <div className="report-actions">
          <button
            type="button"
            className="report-btn"
            onClick={handlePrint}
            disabled={loading || users.length === 0}
          >
            Download Report
          </button>
        </div>
      </main>
    </div>
  );
}

export default Users;
