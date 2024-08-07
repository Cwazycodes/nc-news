import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils/api";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   fetchTopics()
      .then((topicsData) => {
        setTopics(topicsData);
        setLoading(false);
      })
      .catch((err) => {
        console.erro(err);
        setError("Failed to load topics. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
