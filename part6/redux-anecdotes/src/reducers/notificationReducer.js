import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  isError: false,
}

const notificationSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        ...state,
        message: action.payload.message,
        isError: action.payload.isError,
      }
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
