import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cwazycodes-nc-news.onrender.com/api/articles")
      .then((response) => {
        console.log(response.data);
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} {...article} />
      ))}
    </div>
  );
};

export default ArticleList;
