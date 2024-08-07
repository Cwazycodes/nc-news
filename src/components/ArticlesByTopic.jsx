import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleCard from "./ArticleCard";

const ArticlesByTopic = () => {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://cwazycodes-nc-news.onrender.com/api/articles?topic=${topic_slug}`
      )
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles. Please try again.");
        setLoading(false);
      });
  }, [topic_slug]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="articles-by-topic">
      <h2>Articles on {topic_slug}</h2>
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesByTopic;
