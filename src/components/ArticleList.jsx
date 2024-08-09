import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../utils/api";
import { useSearchParams, useParams } from "react-router-dom";
import SortControls from "./SortControls";

const ArticleList = () => {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortLoading, setSortLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sort_by = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";
    setLoading(true);
    setSortLoading(true);
    fetchArticles(topic_slug, sort_by, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
        setSortLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
        setSortLoading(false);
      });
  }, [topic_slug, searchParams]);

  if (loading) return <p role="status" aria-live="polite">Loading articles...</p>;
  if (error) return <p role="alert" className="error">{error}</p>;

  return (
    <section aria-labelledby="article-list-heading">
      <h1 id="article-list-heading">
        {topic_slug ? `Articles on ${topic_slug}` : "All Articles"}
      </h1>
      <SortControls sortLoading={sortLoading} />
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} {...article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleList;