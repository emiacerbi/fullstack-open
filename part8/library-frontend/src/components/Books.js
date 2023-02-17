import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import { updateCache } from '../App'
import { timer } from '../helpers/timer'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

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

const Books = ({ show, setNotification }) => {
  const client = useApolloClient()
  const [genre, setGenre] = useState(null)
  const { data } = useQuery(ALL_BOOKS)

  const handleFilterChange = (filter) => {
    setGenre(filter)
    if (filter === 'all genres') {
      setGenre(null)
      return
    }
  }

  // useEffect(() => {
  //   refetch({ genre })
  // }, [genre])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      setNotification(`${addedBook.title} added to the booklist!`)
      timer(() => setNotification(''), 3000)
    },
  })

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <b>{genre || 'all genres'}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filters.map((filter) => (
        <button onClick={() => handleFilterChange(filter)} key={filter}>
          {filter}
        </button>
      ))}
    </div>
  )
}

export default Books
