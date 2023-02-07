/* eslint-disable indent */
import { createContext, useContext, useEffect, useReducer } from 'react'
import { blogServices } from '../services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

const initialState = null

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogListUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      userDispatch({ type: 'LOG_IN', payload: user })
      blogServices.setToken(user.token)
    }
  }, [])

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext
