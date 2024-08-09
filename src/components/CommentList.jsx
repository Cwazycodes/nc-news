import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { fetchComments, deleteComment } from "../utils/api";

const CommentList = ({ article_id, loggedInUser, comments, setComments }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    if (comments.length === 0) {
      fetchComments(article_id)
        .then((commentsData) => {
          setComments(commentsData);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          if (err.message.includes("404")) {
            setError("No comments found for this article.");
          } else {
            setError("Failed to load comments. Please try again.");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [article_id, setComments]);

  const handleDelete = (comment_id) => {
    if (deleting) return;
    setDeleting(true);
    setDeleteSuccess(null);

    deleteComment(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleting(false);
        setDeleteSuccess("Comment deleted successfully.");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete comment. Please try again.");
        setDeleting(false);
      });
  };

  if (loading) return <p role="status" aria-live="polite">Loading comments...</p>;
  if (error) return <p role="alert" className="error">{error}</p>;
  if (comments.length === 0)
    return (
      <p className="no-comments" role="status" aria-live="polite">
        No comments yet. Be the first to comment!
      </p>
    );

  return (
    <section className="comment-list" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Comments</h2>
      {deleteSuccess && <p role="status" className="success">{deleteSuccess}</p>}
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          {...comment}
          loggedInUser={loggedInUser}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default CommentList;