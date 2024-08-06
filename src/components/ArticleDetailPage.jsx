import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { voteOnArticle, fetchUsers } from "../utils/api";

const ArticleDetailPage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [userVote, setUserVote] = useState(0);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://cwazycodes-nc-news.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        setUsers(users);
        setSelectedUser(users[0]?.username || "");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users. Please try again.");
      });
  }, []);

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
    setArticle((currentArticle) => ({
      ...currentArticle,
      comment_count: currentArticle.comment_count + 1,
    }));
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img
        src={article.article_img_url}
        alt={`Image relating to ${article.topic}`}
        className="article-image"
      />
      <p>by {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>{new Date(article.created_at).toLocaleDateString()}</p>
      <p>{article.body}</p>
      <div className="article-stats">
        <span>Votes: {article.votes}</span>
        <span> Comments: {article.comment_count}</span>
      </div>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote(1)}
          disabled={voteLoading}
          className={userVote === 1 ? "voted" : ""}
        >
          Upvote
        </button>
        <button
          onClick={() => handleVote(-1)}
          disabled={voteLoading}
          className={userVote === -1 ? "voted" : ""}
        >
          Downvote
        </button>
      </div>
      {voteError && <p className="error">{voteError}</p>}

      <div className="user-select-container">
        <label htmlFor="user-select" className="user-select-label">
          Select User:{" "}
        </label>
        <select
          id="user-select"
          value={selectedUser}
          onChange={handleUserChange}
          className="user-select-dropdown"
        >
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <CommentForm
        article_id={article_id}
        username={selectedUser}
        onCommentPosted={handleCommentPosted}
      />
      <CommentList article_id={article_id} />
    </div>
  );
};

export default ArticleDetailPage;
