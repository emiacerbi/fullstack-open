import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    dispatch(createAnecdote(content))
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
