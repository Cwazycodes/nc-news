import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Header = ({loggedInUser, onLogout}) => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">NC News</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {loggedInUser ? (
          <>
            <span>{`Logged in as: ${loggedInUser}`}</span>
            <button onClick={onLogout}>LogOut</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;
