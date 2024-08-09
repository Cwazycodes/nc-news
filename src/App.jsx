import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import "./index.css";
import Header from "./components/Header";
import ArticleDetailPage from "./components/ArticleDetailPage";
import Login from "./components/Login";
import TopicList from "./components/TopicList";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem("loggedInUser", username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
          <main id="main-content" role="main">
            {!loggedInUser ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route
                  element={<ArticleDetailPage loggedInUser={loggedInUser} />}
                  path="/articles/:article_id"
                />
                <Route
                  path="/topics/:topic_slug"
                  element={<ArticleList />}
                />
                <Route path="/topics" element={<TopicList />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;