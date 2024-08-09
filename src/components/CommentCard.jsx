import React from 'react';

const CommentCard = ({ comment_id, author, body, created_at, votes, loggedInUser, onDelete }) => {
  const handleDelete = () => {
    onDelete(comment_id);
  };

  return (
    <article className="comment-card">
      <header className="comment-meta">
        <strong>{author}</strong>
        <time dateTime={new Date(created_at).toISOString()}>
          {new Date(created_at).toLocaleDateString()}
        </time>
        {author === loggedInUser && (
          <button
            onClick={handleDelete}
            className="delete-button"
            aria-label={`Delete comment by ${author}`}
          >
            Delete
          </button>
        )}
      </header>
      <p>{body}</p>
      <footer className="comment-stats">
        <span aria-label={`${votes} votes`}>Votes: {votes}</span>
      </footer>
    </article>
  );
};

export default CommentCard;