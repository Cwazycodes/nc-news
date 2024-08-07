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
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment here..."
        disabled={isPosting}
      />
      <button type="submit" disabled={isPosting}>Post Comment</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Comment posted successfully!</p>}
    </form>
  );
};

export default CommentForm;