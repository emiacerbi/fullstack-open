import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { personService } from './services/persons'
import { Notification } from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [message, setMessage] = useState({
    text: '',
    isError: false,
  })

  const fetchPersons = () => {
    personService
      .getAll()
      .then((res) => setPersons(res))
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

        personService
          .update(duplicatedPerson.id, updatedPerson)
          .then(() => {
            setMessage({
              text: `Edited ${newName}`,
              isError: false,
            })
          })
          .catch((error) => {
            setMessage({
              text: `${error.response.data.error}`,
              isError: true,
            })
          })
          .finally(() => {
            fetchPersons()
            clearInputs()
          })

        return
      } else {
        clearInputs()
        return
      }
    }

    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then(() => {
        setMessage({
          text: `Added ${newName}`,
          isError: false,
        })
      })
      .catch((error) => {
        setMessage({
          text: `${error.response.data.error}`,
          isError: true,
        })
      })
      .finally(() => {
        fetchPersons()
        clearInputs()
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {message.text && <Notification message={message} />}

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
        setMessage={setMessage}
      />
    </div>
  )
}

export default App
