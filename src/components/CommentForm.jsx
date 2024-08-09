import React, { useState } from 'react';
import { postComment } from '../utils/api';

const CommentForm = ({ article_id, username, onCommentPosted }) => {
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.trim() === '') {
      setError('Comment cannot be empty');
      return;
    }

    setIsPosting(true);
    setError(null);
    setSuccess(false);

    postComment(article_id, username, body)
      .then((comment) => {
        setBody('');
        setSuccess(true);
        onCommentPosted(comment);
        setIsPosting(false);
      })
      .catch((err) => {
        console.error('Error posting comment:', err);
        setError('Failed to post comment. Please try again.');
        setIsPosting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form" aria-labelledby="comment-form-heading">
      <h2 id="comment-form-heading">Leave a Comment</h2>
      <label htmlFor="comment-body" className="sr-only">Comment</label>
      <textarea
        id="comment-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment here..."
        disabled={isPosting}
        aria-required="true"
        aria-invalid={error ? "true" : "false"}
      />
      <button type="submit" disabled={isPosting} aria-busy={isPosting}>
        {isPosting ? "Posting..." : "Post Comment"}
      </button>
      {error && <p role="alert" className="error">{error}</p>}
      {success && <p role="status" className="success">Comment posted successfully!</p>}
    </form>
  );
};

export default CommentForm;