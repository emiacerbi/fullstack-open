import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const deletePerson = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then((res) => res.data)
}

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${BASE_URL}/${id}`, updatedPerson)
  return request.then((res) => res.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(`${BASE_URL}`, newPerson)
  return request.then((res) => res.data)
}

export { deletePerson, updatePerson, createPerson }
