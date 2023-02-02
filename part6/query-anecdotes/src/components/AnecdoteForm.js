import { useMutation, useQueryClient } from 'react-query'
import { anecdoteService } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(anecdoteService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
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
