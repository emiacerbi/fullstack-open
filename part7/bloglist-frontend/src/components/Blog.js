import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../context/NotificationContext'
import { blogServices } from '../services/blogs'

const Blog = ({ blog, handleLike }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        <span>{blog.title}</span>
        <span> {blog.author} </span>
        <button id="view-button" onClick={handleClick}>
          {isVisible ? 'hide' : 'view'}
        </button>
        {isVisible && (
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}{' '}
              <button id="like-button" onClick={() => handleLike(blog)}>
                like
              </button>
            </div>
            <div>{blog.author} </div>

            <button onClick={() => handleRemove(blog.id)}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
