import { useDispatch, useSelector } from 'react-redux'
import { voteBlog } from '../reducers/anecdoteReducer'
import { sortBlogs } from '../helpers/sortBlogs'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)
  const sortedBlogs = sortBlogs(anecdotes)

  return (
    <>
      {sortedBlogs.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteBlog(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
