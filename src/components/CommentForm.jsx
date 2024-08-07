import React, {useState} from 'react'
import { postComment } from '../utils/api'

const CommentForm = ({article_id, onCommentPosted}) => {
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const username = 'cooljmessy'

    const handleSubmit = (e) => {
        e.preventDefault()
        if (body.trim() === '') {
            setError('Comment cannot be empty');
            return;
        }

        setLoading(true)
        setError(null)
        setSuccess(false)

        postComment(article_id, username, body)
        .then((comment) => {
            setBody('')
            setSuccess(true)
            onCommentPosted(comment)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setError('Failed to post comment. Please try again.')
            setLoading(false)
    })
}
  return (
    <form onSubmit={handleSubmit} className='comment-form'>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='Write your comment here...' disabled={loading} />
        <button type='submit' disabled={loading}>Post Comment</button>
        {error && <p className='error'>{error}</p> }
        {success && <p className='success'>Comment posted successfully!</p>}
    </form>
  )
}

export default CommentForm