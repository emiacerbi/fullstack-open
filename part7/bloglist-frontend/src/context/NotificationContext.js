/* eslint-disable indent */
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        text: action.payload.text,
        isError: action.payload.isError,
      }
    case 'HIDE':
      return {
        text: '',
        isError: false,
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

const initialState = {
  text: '',
  isError: false,
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
