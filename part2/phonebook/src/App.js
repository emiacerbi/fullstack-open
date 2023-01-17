import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

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

    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} already exists`)
      setNewName('')
      setNewNumber('')
      return
    }

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
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

      <Persons persons={persons} filterInput={filterInput} />
    </div>
  )
}

export default App
