import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const Authors = ({ show }) => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const bornNumber = Number(born)
    await editAuthor({
      variables: { name, setBornTo: bornNumber },
    })

    setName('')
    setBorn('')
  }

  if (!show) {
    return null
  }

  if (loading) {
    return <div>Loading, please wait...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>

      <form onSubmit={handleSubmit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)} value={name}>
            <option value="">Please choose an author</option>
            {data?.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born
          <input
            onChange={({ target }) => setBorn(target.value)}
            value={born}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
