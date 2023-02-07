import { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Blog from './components/Blog'
import Login from './components/Login'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { blogServices } from './services/blogs'
import { sortByLikes } from './helpers/sortByLikes'
import { useNotificationDispatch } from './context/NotificationContext'
import { useUserDispatch, useUserValue } from './context/UserContext'
import './index.css'

const App = () => {
  const dispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const user = useUserValue()
  const noteFormRef = useRef()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery('blogs', blogServices.getAll, {
    refetchOnWindowFocus: false,
  })

  const updateMutation = useMutation(blogServices.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const createMutation = useMutation(blogServices.create, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('blogs')
      dispatch({
        type: 'SHOW',
        payload: { text: `a new blog ${res.title} added`, isError: false },
      })
    },
    onError: () => {
      dispatch({
        type: 'SHOW',
        payload: {
          text: 'URL or Author missing',
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

  const handleLogout = () => {
    userDispatch({ type: 'LOG_OUT' })
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
          <Login />
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

      <Notification />

      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {sortByLikes(data).map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  )
}

export default App
