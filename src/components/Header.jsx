import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Header = ({ loggedInUser, onLogout }) => {
  return (
    <header className="app-header" aria-label="Main site header">
      <div className="logo">
        <Link to="/" aria-label="Go to NC News homepage">NC News</Link>
      </div>
      <nav className="navigation" aria-label="Main navigation">
        <ul>
          <li>
            <Link to="/" aria-label="Go to Home page">Home</Link>
          </li>
          <li>
            <Link to="/topics" aria-label="Go to Topics page">Topics</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {loggedInUser ? (
          <>
            <span aria-label={`Logged in as ${loggedInUser}`}>{`Logged in as: ${loggedInUser}`}</span>
            <button className="logout-button" onClick={onLogout} aria-label="Log out">
              LogOut
            </button>
          </>
        ) : (
          <span aria-label="User not logged in">Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;