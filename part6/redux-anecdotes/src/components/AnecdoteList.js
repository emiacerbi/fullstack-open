import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortAnecdotes } from '../helpers/sortAnecdotes'
import {
  initializedAnecdotes,
  updateAnecdote,
} from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    dispatch(initializedAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector((state) => state.anecdotes)
  const sortedAnecdotes = sortAnecdotes(anecdotes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const handleVote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(
      setNotification(
        {
          message: `you voted '${anecdote.content}'`,
          isError: false,
        },
        3
      )
    )
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
