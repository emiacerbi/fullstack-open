import { useState } from 'react'
import loginService from '../services/login'
import { Notification } from './Notification'

const Login = ({ setUser, setMessage, message }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isNotificationShowing, setIsNotificationShowing] = useState(false)

  const handleChange = (e, setState) => {
    setState(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      window.localStorage.setItem('blogListUser', JSON.stringify(response))

      setUsername('')
      setPassword('')
    } catch (error) {
      setIsNotificationShowing(true)
      setMessage({
        text: 'Wrong credentials',
        isError: true,
      })
    } finally {
      setTimeout(() => {
        setIsNotificationShowing(false)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>

      {isNotificationShowing && <Notification message={message} />}

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input onChange={(e) => handleChange(e, setUsername)} />
        </div>
        <div>
          password
          <input onChange={(e) => handleChange(e, setPassword)} />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
