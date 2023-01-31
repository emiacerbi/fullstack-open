import { useDispatch, useSelector } from 'react-redux'
import { voteBlog } from '../reducers/anecdoteReducer'
import { sortBlogs } from '../helpers/sortBlogs'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.blogs)
  const filter = useSelector((state) => state.filter)

  const sortedBlogs = sortBlogs(anecdotes)
  const filteredBlogs = sortedBlogs.filter((blog) =>
    blog.content.toLowerCase().includes(filter)
  )

  return (
    <>
      {filteredBlogs.map((anecdote) => (
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
