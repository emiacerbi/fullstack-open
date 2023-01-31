import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (e) => {
    e.preventDefault()

    const content = e.target.blog.value
    dispatch(createBlog(content))
    e.target.blog.value = ''
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <div>
        <input name="blog" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
