import React from "react";

const ArticleCard = ({
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
      <img src={article_img_url} alt={title} className="article-image" />
      <div className="article-content">
        <h2>{title}</h2>
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
