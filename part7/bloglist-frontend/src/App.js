import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import { blogServices } from './services/blogs'
import './index.css'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { sortByLikes } from './helpers/sortByLikes'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: '',
    isError: false,
  })

  const noteFormRef = useRef()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery('blogs', blogServices.getAll, {
    refetchOnWindowFocus: false,
  })

  const updateMutation = useMutation(blogServices.update, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const createMutation = useMutation(blogServices.create, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('blogs')
      setMessage({
        text: `a new blog ${res.title} added`,
        isError: false,
      })
    },
    onError: (res) => {
      setMessage({
        text: 'URL or Author missing',
        isError: true,
      })
    },
    onSettled: (res) => {
      setTimeout(() => {
        setMessage({
          text: '',
          isError: false,
        })
      }, 3000)
    },
  })

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateMutation.mutate({ id: blog.id, blog: newBlog })
  }

  const createBlog = async (blogInput) => {
    noteFormRef.current.toggleVisibility()
    createMutation.mutate(blogInput)
  }

  if (isLoading) {
    return 'Loading...'
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
        <BlogForm createBlog={createBlog} setMessage={setMessage} />
      </Togglable>

      {sortByLikes(data).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          setMessage={setMessage}
        />
      ))}
    </div>
  )
}

export default App
