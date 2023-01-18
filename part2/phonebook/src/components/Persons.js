import { deletePerson } from '../services/persons'

export const Persons = ({ persons, filterInput, fetchPersons }) => {
  const handleClick = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      deletePerson(id)
      fetchPersons()
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
