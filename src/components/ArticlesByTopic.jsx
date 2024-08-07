import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import SortControls from "./SortControls";
import { fetchArticles } from "../utils/api";

const ArticlesByTopic = () => {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort_by = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    fetchArticles(topic_slug, sort_by, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load articles. Please try again.");
        setLoading(false);
      });
  }, [topic_slug, searchParams]);

  const handleSortChange = (sort_by) => {
    searchParams.set("sort_by", sort_by);
    setSearchParams(searchParams);
  };

  const handleOrderChange = (order) => {
    searchParams.set("order", order);
    setSearchParams(searchParams);
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="articles-by-topic">
      <h2>Articles on {topic_slug}</h2>
      <SortControls
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesByTopic;
