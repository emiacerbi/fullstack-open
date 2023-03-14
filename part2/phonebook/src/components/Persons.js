import { personService } from '../services/persons'

export const Persons = ({ persons, filterInput, fetchPersons, setMessage }) => {
  const handleClick = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setMessage({
            text: `${name} was deleted from the list`,
            isError: false,
          })
        })
        .catch(() => {
          setMessage({
            text: `Information of ${name} has already been removed from the server`,
            isError: true,
          })
        })
        .finally(() => {
          fetchPersons()
        })
    }
  }

  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterInput.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            <span>
              {person.name} {person.number}
            </span>{' '}
            <button onClick={() => handleClick(person.id, person.name)}>
              delete
            </button>
          </div>
        ))}
    </div>
  )
}
