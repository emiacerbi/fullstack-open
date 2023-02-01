import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(
      setNotification(
        {
          message: `new anecdote: '${content}'`,
          isError: false,
        },
        3
      )
    )
    e.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
