import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import './index.css'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { sortByLikes } from './helpers/sortByLikes'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: '',
    isError: false,
  })

  const noteFormRef = useRef()

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
      setBlogs((prevBlogs) => prevBlogs.concat(blogInput))

      setBlogInput({
        title: '',
        author: '',
        url: '',
      })

      setMessage({
        text: `a new blog ${response.title} added`,
        isError: false,
      })

      noteFormRef.current.toggleVisibility()
    } catch (error) {
      setMessage({
        text: 'URL or Author missing',
        isError: true,
      })
    } finally {
      setTimeout(() => {
        setMessage({
          text: '',
          isError: false,
        })
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Bloglist app</h1>
        <Togglable buttonLabel="log in">
          <Login setUser={setUser} message={message} setMessage={setMessage} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist app</h1>

      <div>
        <span>{user.name} logged in</span>{' '}
        <button onClick={handleLogout}>logout</button>
      </div>

      <Notification message={message} />

      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <BlogForm
          handleChange={handleChange}
          handleCreate={handleCreate}
          blogInput={blogInput}
        />
      </Togglable>

      {sortByLikes(blogs).map((blog) => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
    </div>
  )
}

export default App
