import axios from "axios";

const api = axios.create({
  baseURL: "https://cwazycodes-nc-news.onrender.com/api",
});

export const fetchArticles = () => {
  return api
    .get("/articles")
    .then((response) => response.data.articles)
    .catch((error) => {
      throw error;
    });
};

export const fetchComments = (article_id) => {
    return api.get(`/articles/${article_id}/comments`)
    .then(response => response.data.comments)
    .catch(error => {
        throw error
    })
}
