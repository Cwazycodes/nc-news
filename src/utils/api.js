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
    .then((response) => response.data.comments)
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404) {
          return []
        } else {
          console.error("Error in fetchComments:", error.response.data)
          throw new Error('Error fetching comments: ' + error.response.data.message)
        }
      } else if (error.request) {
        console.error("Error in fetchComments, no response;", error.request)
        throw new Error('Error fetching comments: No response from server')
      } else {
        console.error('Error in fetchComments:', error.message)
        throw new Error('Error fetching comments: ' + error.message)
      }
    })
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
    .then(() => null)
    .catch((error) => {
      if (error.response) {
        console.error('Error in deleteComment:', error.response.data)
        throw new Error('Error deleting comment: ' + error.response.data.message)
      }else if (error.request) {
        console.error("Error in deleteComment, no response;", error.request)
        throw new Error('Error deleting comment: No response from server')
      } else {
        console.error("Error in deleteComment;", error.message)
        throw new Error('Error deleting comment:' + error.message)
      }
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

