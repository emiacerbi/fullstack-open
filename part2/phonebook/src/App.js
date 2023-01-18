import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import axios from 'axios'
import { updatePerson } from './services/persons'

const BASE_URL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  const fetchPersons = () => {
    axios
      .get(BASE_URL)
      .then((res) => setPersons(res.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchPersons()
  }, [])

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterInput(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault()

    const duplicatedPerson = persons.find(({ name }) => name === newName)

    if (duplicatedPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = {
          ...duplicatedPerson,
          number: newNumber,
        }

        updatePerson(duplicatedPerson.id, updatedPerson)
        fetchPersons()
        clearInputs()
        return
      } else {
        clearInputs()
        return
      }
    }

    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 10000 + 1),
      },
    ])
    clearInputs()
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        handleFilterChange={handleFilterChange}
        filterInput={filterInput}
      />

      <h2>add a new</h2>

      <PersonForm
        handleAdd={handleAdd}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filterInput={filterInput}
        fetchPersons={fetchPersons}
      />
    </div>
  )
}

export default App
