import React, { useState, useEffect } from "react";
import { fetchUsers } from "../utils/api";

const Login = ({ onLogin }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((usersData) => {
        setUsers(usersData);
        setSelectedUser(usersData[0]?.username || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(selectedUser);
  };

  if (loading) return <p role="status" aria-live="polite">Loading users...</p>;
  if (error) return <p role="alert" className="error">{error}</p>;

  return (
    <div className="login" aria-labelledby="login-heading">
      <h2 id="login-heading">Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="user-select">Select a user:</label>
        <select
          id="user-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
          aria-required="true"
        >
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <button type="submit" aria-busy={loading}>Login</button>
      </form>
    </div>
  );
};

export default Login;