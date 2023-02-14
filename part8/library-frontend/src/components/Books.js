import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const filters = [
  'all genres',
  'refactoring',
  'agile',
  'patterns',
  'design',
  'crime',
  'classic',
  'Epic',
]

const Books = ({ show }) => {
  const { data } = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(filters[0])

  if (!show) {
    return null
  }

  const filteredBooks = data?.allBooks.filter(
    (book) => book.genres.includes(genre) || genre === 'all genres'
  )

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{genre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filters.map((filter) => (
        <button onClick={() => setGenre(filter)} key={filter}>
          {filter}
        </button>
      ))}
    </div>
  )
}

export default Books
