import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import "./index.css";
import Header from "./components/Header";
import ArticleDetailPage from "./components/ArticleDetailPage";
import Login from "./components/Login";
import TopicList from "./components/TopicList";
import ArticlesByTopic from "./components/ArticlesByTopic";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <ErrorBoundary>

      <div className="app">
        <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
        <main>
          {!loggedInUser ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route
                element={<ArticleDetailPage loggedInUser={loggedInUser} />}
                path="/articles/:article_id"
                />
              <Route path='/topics/:topic_slug' element={<ArticlesByTopic />}  />
              <Route path='/topics' element={<TopicList />}  />
              <Route path='*' element={<NotFound />} />
            </Routes>
          )}
        </main>
      </div>
          </ErrorBoundary>
    </Router>
  );
};

export default App;
