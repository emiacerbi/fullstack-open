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
    onError: (res) => {
      console.error(res)
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
    <div className="mt-4">
      <h2 className="text-2xl font-bold">{blog.title}</h2>
      <a className="text-blue-400" href={blog.url}>
        {blog.url}
      </a>
      <div>
        likes {blog.likes}{' '}
        <button
          className="bg-amber-400 rounded-md py-1 px-4"
          onClick={() => handleLike(blog)}
        >
          like
        </button>
      </div>
      <div>added by {blog.author}</div>

      <form onSubmit={handleSubmit} className="mt-4">
        <h3>Comments</h3>

        <input
          value={commentInput}
          className="border py-1 px-2 rounded-md mt-2"
          onChange={handleChange}
        />
        <button
          disabled={commentMutation.isLoading}
          className="bg-purple-400 ml-2 py-1 px-4 rounded-md"
        >
          {commentMutation.isLoading ? 'Loading' : 'Add comment'}
        </button>
      </form>

      {blog.comments.length > 0 && (
        <ul className="list-disc flex flex-col gap-2 pl-4 mt-2">
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}

      <button
        className="bg-green-400 rounded-md py-1 px-4 mt-4"
        onClick={() => navigate('/')}
      >
        Go back
      </button>
    </div>
  )
}

export default BlogDetail
