export const Persons = ({ persons, filterInput }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterInput.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  )
}
