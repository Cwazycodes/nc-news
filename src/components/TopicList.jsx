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
        console.error(err);
        setError("Failed to load topics. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p role="status" aria-live="polite">Loading topics...</p>;
  if (error) return <p role="alert" className="error">{error}</p>;

  return (
    <section className="topic-list" aria-labelledby="topics-heading">
      <h2 id="topics-heading">Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`} aria-label={`View articles about ${topic.slug}`}>
              {topic.slug}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopicList;