import React from 'react'

const CommentCard = ({author, body, created_at, votes}) => {
  return (
    <div className='comment-card'>
        <p>{body}</p>
        <div className='comment-meta'>
        <span>by {author}</span>
        <span>{new Date(created_at).toLocaleDateString()}</span>
        <span>Votes: {votes}</span>
        </div>
    </div>
  )
}

export default CommentCard