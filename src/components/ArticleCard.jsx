import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({
article_id,
  title,
  author,
  topic,
  created_at,
  votes,
  comment_count,
  article_img_url,
}) => {
  return (
    <div className="article-card">
      <img src={article_img_url} alt={`Image relating to ${topic}`} className="article-image" />
      <div className="article-content">
        <h2><Link to={`/articles/${article_id}`}>{title}</Link></h2>
        <p>by {author}</p>
        <p>Topic: {topic}</p>
        <p>{new Date(created_at).toLocaleDateString()}</p>
        <div className="article-stats">
          <span>Votes: {votes}</span>
          <span> Comments: {comment_count}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
