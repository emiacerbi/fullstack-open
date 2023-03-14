import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(BASE_URL)
  return request.then((res) => res.data)
}

const remove = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then((res) => res.data)
}

const update = (id, updatedPerson) => {
  const request = axios.put(`${BASE_URL}/${id}`, updatedPerson)
  return request.then((res) => res.data)
}

const create = (newPerson) => {
  const request = axios.post(`${BASE_URL}`, newPerson)
  return request.then((res) => res.data)
}

export const personService = {
  getAll,
  remove,
  update,
  create,
}
