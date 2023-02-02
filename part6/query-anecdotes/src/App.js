import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { anecdoteService } from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery(
    'anecdotes',
    anecdoteService.getAll,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const mutation = useMutation(anecdoteService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = async (anecdote) => {
    mutation.mutate(anecdote)
  }

  if (error) {
    return <h1>anecdote service not available due to problems in server</h1>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {isLoading && 'Loading, please wait...'}

      {data?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
