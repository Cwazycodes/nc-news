import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CommentList from './CommentList'
import { voteOnArticle } from '../utils/api'

const ArticleDetailPage = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [voteError, setVoteError] = useState(null)

    useEffect(() => {
        axios.get(`https://cwazycodes-nc-news.onrender.com/api/articles/${article_id}`)
        .then((response) => {
            setArticle(response.data.article)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setError(err.message)
            setLoading(false)
        })
    }, [])

    const handleVote = (inc_votes) => {
        setVoteError(null)
        setArticle((currentArticle) => ({
            ...currentArticle,
            votes: currentArticle.votes + inc_votes
        }))

        voteOnArticle(article_id, inc_votes)
        .catch((err) => {
            console.error(err)
            setVoteError("Failed to update votes. Please try again")
            setArticle((currentArticle) => ({
                ...currentArticle,
                votes: currentArticle.votes - inc_votes,
            }))
        })
    }

    if (loading) return <p>Loading article...</p>
    if (error) return <p>Error: {error}</p>

  return (
    <div className='article-detail'>
        <h1>{article.title}</h1>
        <img src={article.article_img_url} alt={article.title} className='article-image' />
        <p>by {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>{new Date(article.created_at).toLocaleDateString()}</p>
        <p>{article.body}</p>
        <div className='article-stats'>
            <span>Votes: {article.votes}</span>
            <span> Comments: {article.comment_count}</span>
        </div>
        <div className='vote-buttons'>
            <button onClick={() => handleVote(1)}>Upvote</button>
            <button onClick={() => handleVote(-1)}>Downvote</button>
        </div>
        {voteError && <p className='error'>{voteError}</p>}
        <CommentList article_id={article_id} />
    </div>
  )
}

export default ArticleDetailPage