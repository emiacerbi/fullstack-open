import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  isError: false,
}

const notificationSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    triggerNotification(state, action) {
      return {
        message: action.payload.message,
        isError: action.payload.isError,
      }
    },
  },
})

export const { triggerNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch(triggerNotification(notification))

    setTimeout(() => {
      dispatch(triggerNotification({ message: null, isError: false }))
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
