import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import "./index.css";
import Header from "./components/Header";
import ArticleDetailPage from "./components/ArticleDetailPage";
import Login from "./components/Login";
import TopicList from "./components/TopicList";
import ArticlesByTopic from "./components/ArticlesByTopic";

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
      <div className="app">
        <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
        <main>
          {!loggedInUser ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path='/topics' element={<TopicList />}  />
              <Route path='/topics/:topic_slug' element={<ArticlesByTopic />}  />
              <Route
                path="/articles/:article_id"
                element={<ArticleDetailPage loggedInUser={loggedInUser} />}
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
