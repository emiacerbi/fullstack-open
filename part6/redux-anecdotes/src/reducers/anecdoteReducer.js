import { getId } from '../helpers/getId'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload]
    case 'VOTE':
      const id = action.payload.id
      const blogToVote = state.find((blog) => blog.id === id)
      const newBlog = {
        ...blogToVote,
        votes: blogToVote.votes + 1,
      }

      return state.map((blog) => (blog.id === id ? newBlog : blog))

    default:
      return state
  }
}

export const createBlog = (content) => {
  return {
    type: 'CREATE',
    payload: {
      id: getId(),
      content,
      votes: 0,
    },
  }
}

export const voteBlog = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id,
    },
  }
}

export default reducer
