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
    <article className="article-card">
      <img
        src={article_img_url}
        alt={`Illustration related to ${topic}`}
        className="article-image"
      />
      <div className="article-content">
        <h2>
          <Link to={`/articles/${article_id}`}>{title}</Link>
        </h2>
        <p>
          <span className="sr-only">Author:</span> {author}
        </p>
        <p>
          <span className="sr-only">Topic:</span> {topic}
        </p>
        <p>
          <time dateTime={new Date(created_at).toISOString()}>
            {new Date(created_at).toLocaleDateString()}
          </time>
        </p>
        <div className="article-stats">
          <span aria-label={`${votes} votes`}>Votes: {votes}</span>
          <span aria-label={`${comment_count} comments`}>
            Comments: {comment_count}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
