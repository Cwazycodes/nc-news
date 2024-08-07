import axios from "axios";

const api = axios.create({
  baseURL: "https://cwazycodes-nc-news.onrender.com/api",
});

export const fetchArticles = (topic, sort_by = "created_at", order = "desc") => {
  const params = {sort_by, order}
  if (topic) params.topic = topic
  return api
    .get("/articles", { params })
    .then((response) => response.data.articles)
    .catch((error) => {
      throw error;
    });
};

export const fetchComments = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      if (response.data.comments.length === 0) {
        return [];
      }
      return response.data.comments;
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return [];
      } else {
        throw error;
      }
    });
};

export const voteOnArticle = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then((response) => response.data.article)
    .catch((error) => {
      throw error;
    });
};

export const postComment = (article_id, username, body) => {
  return api
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((response) => response.data.comment)
    .catch((error) => {
      console.error("Error posting comments:", error);
      throw error;
    });
};

export const fetchUsers = () => {
  return api
    .get("/users")
    .then((response) => response.data.users)
    .catch((error) => {
      throw error;
    });
};

export const deleteComment = (comment_id) => {
  return api
    .delete(`/comments/${comment_id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const fetchTopics = () => {
  return api
  .get("/topics")
  .then((response) => response.data.topics)
  .catch((error) => {
    throw error;
  });
};

