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
    event.preventDefault()
    onLogin(selectedUser);
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="login">
      <h2>Login</h2>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        required
      >
        {users.map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
