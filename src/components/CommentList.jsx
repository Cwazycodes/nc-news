import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { fetchComments, deleteComment } from "../utils/api";

const CommentList = ({ article_id, username, comments, setComments }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (comments.length === 0) {
      fetchComments(article_id)
        .then((commentsData) => {
          setComments(commentsData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load comments. Please try again.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [article_id, comments, setComments]);

  const handleDelete = (comment_id) => {
    if (deleting) return;
    setDeleting(true);

    deleteComment(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleting(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete comment. Please try again.");
        setDeleting(false);
      });
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;
  if (comments.length === 0) return <p className="no-comments">No comments yet. Be the first to comment!</p>;

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          {...comment}
          username={username}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;