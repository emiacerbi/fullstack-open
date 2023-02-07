import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useMatch, useNavigate } from 'react-router-dom'
import { blogServices } from '../services/blogs'

const BlogDetail = ({ blogs, handleLike }) => {
  const [commentInput, setCommentInput] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const match = useMatch('/blogs/:id')

  const commentMutation = useMutation(blogServices.addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const handleChange = (e) => {
    setCommentInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    commentMutation.mutate({ id: blog.id, comment: commentInput })
    setCommentInput('')
  }

  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  if (!blog) return <h2>That blog doesn&apos;t exist</h2>

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}{' '}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.author}</div>

      <form onSubmit={handleSubmit}>
        <h3>comments</h3>

        <input value={commentInput} onChange={handleChange} />
        <button>add comment</button>
      </form>

      {blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate('/')}>Go back</button>
    </div>
  )
}

export default BlogDetail
