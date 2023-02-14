import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LOGIN } from '../mutations'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault()
    login({
      variables: { username, password },
    })

    setUsername('')
    setPassword('')
  }

  if (!show) return null

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name
        <input onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button>login</button>
    </form>
  )
}

export default LoginForm
