import React from "react";

const CommentCard = ({
  comment_id,
  author,
  body,
  created_at,
  votes,
  username,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(comment_id);
  };

  return (
    <div className="comment-card">
      <div className="comment-meta">
        <span>by {author}</span>
        <span>{new Date(created_at).toLocaleDateString()}</span>
        {author === username && (
            <button onClick={handleDelete} className="delete-button">
                Delete
            </button>
        )}
      </div>
      <p>{body}</p>
      <div className="comment-stats">
        <span>Votes: {votes}</span>
      </div>
    </div>
  );
};

export default CommentCard;
