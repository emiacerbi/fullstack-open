import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../context/NotificationContext'
import { anecdoteService } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const mutation = useMutation(anecdoteService.create, {
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({ type: 'SHOW', payload: `anecdote ${content} created` })
    },
    onError: ({ response }) => {
      dispatch({
        type: 'SHOW',
        payload: response.data.error,
      })
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    const newAnecdote = {
      content,
      votes: 0,
    }

    mutation.mutate(newAnecdote)
    event.target.anecdote.value = ''

    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 2000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
