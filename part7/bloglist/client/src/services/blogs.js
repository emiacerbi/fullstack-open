import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async ({ id, blog }) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const remove = async ({ id }) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const addComment = ({ id, comment }) => {
  const response = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response
}

export const blogServices = {
  getAll,
  create,
  update,
  setToken,
  remove,
  addComment,
}
