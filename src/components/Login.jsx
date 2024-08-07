import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cwazycodes-nc-news.onrender.com/api/users")
      .then((response) => {
        setUsers(response.data.users);
        setSelectedUser(response.data.users[0]?.username || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
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
