import { useState } from 'react'

import blogServices from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  const handleLike = async (prevLikes) => {
    const newBlog = {
      ...blog,
      likes: prevLikes + 1,
    }

    const response = await blogServices.update(blog.id, newBlog)

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === response.id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    )
  }

  const handleRemove = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogServices.remove(id)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
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
      <div>
        {blog.title} {blog.author}
        <button onClick={handleClick}>{isVisible ? 'hide' : 'view'}</button>
        {isVisible && (
          <div>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}{' '}
              <button onClick={() => handleLike(blog.likes)}>like</button>
            </div>
            <div>{blog.author}</div>

            <button onClick={() => handleRemove(blog.id)}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
