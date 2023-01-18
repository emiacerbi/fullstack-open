import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const deletePerson = (id) => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error))
}

const updatePerson = (id, updatedPerson) => {
  axios
    .put(`${BASE_URL}/${id}`, updatedPerson)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error))
}

export { deletePerson, updatePerson }
