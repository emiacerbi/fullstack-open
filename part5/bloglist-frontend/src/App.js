import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import './index.css'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: '',
    isError: false,
  })

  const [isNotificationShowing, setIsNotificationShowing] = useState(false)

  const [blogInput, setBlogInput] = useState({
    title: '',
    author: '',
    url: '',
  })

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBlogInput({
      ...blogInput,
      [name]: value,
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.create(blogInput)
      await fetchBlogs()
      setBlogInput({
        title: '',
        author: '',
        url: '',
      })

      setMessage({
        text: `a new blog ${response.title} added`,
        isError: false,
      })
      setIsNotificationShowing(true)
    } catch (error) {
      setMessage({
        text: 'URL or Author missing',
        isError: true,
      })
      setIsNotificationShowing(true)
    } finally {
      setTimeout(() => {
        setIsNotificationShowing(false)
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Login setUser={setUser} message={message} setMessage={setMessage} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <div>
        <span>{user.name} logged in</span>{' '}
        <button onClick={handleLogout}>logout</button>
      </div>

      {isNotificationShowing && <Notification message={message} />}

      <form onSubmit={handleCreate}>
        <h2>create new</h2>

        <div>
          title:
          <input onChange={handleChange} name="title" value={blogInput.title} />
        </div>
        <div>
          author:
          <input
            onChange={handleChange}
            name="author"
            value={blogInput.author}
          />
        </div>
        <div>
          url:
          <input onChange={handleChange} name="url" value={blogInput.url} />
        </div>

        <button type="submit">create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
