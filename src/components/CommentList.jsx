import React, {useState, useEffect} from 'react'
import CommentCard from './CommentCard'
import { fetchComments } from '../utils/api'

const CommentList = ({article_id}) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchComments(article_id)
        .then((commentsData) => {
            setComments(commentsData)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setError(err.message)
            setLoading(false)
        })
    }, [])

    if(loading) return <p>Loading comments...</p>
    if (error) return <p>Error: {error}</p>

  return (
   <div className='comment-list'>
    {comments.map((comment) => (
        <CommentCard key={comment.comment_id} {...comment} />
    ))}
   </div>
  )
}

export default CommentList