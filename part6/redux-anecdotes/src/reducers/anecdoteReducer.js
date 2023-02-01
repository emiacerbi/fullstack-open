import { createSlice } from '@reduxjs/toolkit'
import { anecdoteService } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id

      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)

      const newAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id === id ? newAnecdote : anecdote
      )
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions

export const initializedAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(createdAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
