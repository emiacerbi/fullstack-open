import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNotificationDispatch } from '../context/NotificationContext'
import { useUserDispatch } from '../context/UserContext'
import { blogServices } from '../services/blogs'
import { loginServices } from '../services/login'
import { Notification } from './Notification'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const handleChange = (e, setState) => {
    setState(e.target.value)
  }

  const loginMutation = useMutation(loginServices.login, {
    onSuccess: (res) => {
      userDispatch({ type: 'LOG_IN', payload: res })
      blogServices.setToken(res)
      window.localStorage.setItem('blogListUser', JSON.stringify(res))

      setUsername('')
      setPassword('')
    },
    onError: () => {
      dispatch({
        type: 'SHOW',
        payload: {
          text: 'Wrong credentials',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    loginMutation.mutate({ username, password })
  }

  return (
    <div>
      <h2>log in to application</h2>

      <Notification />

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id="username" onChange={(e) => handleChange(e, setUsername)} />
        </div>
        <div>
          password
          <input id="password" onChange={(e) => handleChange(e, setPassword)} />
        </div>

        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
