export const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.votes - a.votes)
}
