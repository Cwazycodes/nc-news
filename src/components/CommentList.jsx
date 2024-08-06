import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { fetchComments } from "../utils/api";

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [article_id]);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;
  if (comments.length === 0) return <p className="no-comments">No comments yet. Be the first to comment!</p>;

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;