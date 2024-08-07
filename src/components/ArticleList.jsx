import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import SortControls from "./SortControls";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] =useSearchParams()

  useEffect(() => {
    const sort_by = searchParams.get('sort_by') || 'created_at'
    const order = searchParams.get('order') || 'desc'
   fetchArticles(null, sort_by, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="article-list">
      <SortControls />
      {articles.map((article) => (
        <ArticleCard key={article.article_id} {...article} />
      ))}
    </div>
  );
};

export default ArticleList;
