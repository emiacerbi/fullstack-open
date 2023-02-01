import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }

  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const update = async (anecdote) => {
  const { id } = anecdote
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

export const anecdoteService = {
  getAll,
  create,
  update,
}
