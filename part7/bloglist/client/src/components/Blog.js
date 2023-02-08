import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { useNotificationDispatch } from '../context/NotificationContext'
import { blogServices } from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(blogServices.remove, {
    onSuccess: (res) => {
      const deletedBlog = res.data
      queryClient.invalidateQueries('blogs')
      dispatch({
        type: 'SHOW',
        payload: {
          text: `${deletedBlog.title} by ${deletedBlog.author} removed succesfully`,
          isError: false,
        },
      })
    },
    onError: () => {
      dispatch({
        type: 'SHOW',
        payload: {
          text: 'You are not allowed to remove this blog',
          isError: true,
        },
      })
    },
    onSettled: () => {
      setTimeout(() => {
        dispatch({
          type: 'HIDE',
        })
      }, 3000)
    },
  })

  const handleRemove = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteMutation.mutate({ id })
    }
  }

  return (
    <div id="blog" className="border p-4 rounded-md">
      <div className="flex items-center">
        <Link to={`blogs/${blog.id}`} className="text-blue-500">
          <span>{blog.title}</span>
          <span className="text-orange-400"> {blog.author} </span>
        </Link>
        <button
          className="bg-red-400 rounded-md px-4 py-1 ml-auto"
          onClick={() => handleRemove(blog.id)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default Blog
