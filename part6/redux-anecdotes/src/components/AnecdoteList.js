import { useDispatch, useSelector } from 'react-redux'
import { sortAnecdotes } from '../helpers/sortAnecdotes'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const sortedAnecdotes = sortAnecdotes(anecdotes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const handleVote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(
      setNotification({
        message: `you voted '${content}'`,
        isError: false,
      })
    )

    setTimeout(() => {
      dispatch(
        setNotification({
          message: null,
          isError: false,
        })
      )
    }, 2000)
  }

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
