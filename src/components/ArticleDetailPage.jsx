import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { voteOnArticle } from "../utils/api";
import NotFound from "./NotFound"; 

const ArticleDetailPage = ({ loggedInUser }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [userVote, setUserVote] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://cwazycodes-nc-news.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 404) {
          setError("Article not found."); 
        } else {
          setError("Failed to load the article. Please try again later.");
        }
        setLoading(false);
      });
  }, [article_id]);

  const handleVote = (inc_votes) => {
    if (voteLoading) return;
    setVoteLoading(true);
    setVoteError(null);

    let voteAdjustment = inc_votes;
    if (userVote === inc_votes) {
      voteAdjustment = -inc_votes;
    }

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + voteAdjustment,
    }));

    voteOnArticle(article_id, voteAdjustment)
      .then(() => {
        setVoteLoading(false);
        setUserVote(userVote === inc_votes ? 0 : inc_votes);
      })
      .catch((err) => {
        console.error(err);
        setVoteError("Failed to update votes. Please try again.");
        setArticle((currentArticle) => ({
          ...currentArticle,
          votes: currentArticle.votes - voteAdjustment,
        }));
        setVoteLoading(false);
      });
  };

  const handleCommentPosted = (newComment) => {
    setComments((currentComments) => [newComment, ...currentComments]);
    setArticle((currentArticle) => ({
      ...currentArticle,
      comment_count: currentArticle.comment_count + 1,
    }));
  };

  if (loading) return <p>Loading article...</p>;
  if (error && error === "Article not found.") return <NotFound />;
  if (error) return <p role="alert" className="error">{error}</p>;

  return (
    <article className="article-detail">
      <h1>{article.title}</h1>
      <img
        src={article.article_img_url}
        alt={`Image relating to ${article.topic}`}
        className="article-image"
      />
      <p><strong>by {article.author}</strong></p>
      <p><strong>Topic:</strong> {article.topic}</p>
      <p>
        <time dateTime={new Date(article.created_at).toISOString()}>
          {new Date(article.created_at).toLocaleDateString()}
        </time>
      </p>
      <p>{article.body}</p>
      <div className="article-stats">
        <span aria-live="polite">Votes: {article.votes}</span>
        <span aria-live="polite">Comments: {article.comment_count}</span>
      </div>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote(1)}
          disabled={voteLoading}
          className={userVote === 1 ? "voted" : ""}
          aria-label="Upvote this article"
        >
          Upvote
        </button>
        <button
          onClick={() => handleVote(-1)}
          disabled={voteLoading}
          className={userVote === -1 ? "voted" : ""}
          aria-label="Downvote this article"
        >
          Downvote
        </button>
      </div>
      {voteError && <p role="alert" className="error">{voteError}</p>}

      <CommentForm
        article_id={article_id}
        username={loggedInUser}
        onCommentPosted={handleCommentPosted}
      />
      <CommentList
        article_id={article_id}
        comments={comments}
        loggedInUser={loggedInUser}
        setComments={setComments}
      />
    </article>
  );
};

export default ArticleDetailPage;