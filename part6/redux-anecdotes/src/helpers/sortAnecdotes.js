export const sortAnecdotes = (anecdotes) => {
  const copy = [...anecdotes]
  return copy.sort((a, b) => b.votes - a.votes)
}
