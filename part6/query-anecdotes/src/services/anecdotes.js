import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const update = async (anecdoteToUpdate) => {
  const id = anecdoteToUpdate.id
  const newAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  }

  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

export const anecdoteService = {
  getAll,
  create,
  update,
}
