const BlogForm = ({ handleCreate, handleChange, blogInput }) => {
  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>

      <div>
        title:
        <input onChange={handleChange} name="title" value={blogInput.title} />
      </div>
      <div>
        author:
        <input onChange={handleChange} name="author" value={blogInput.author} />
      </div>
      <div>
        url:
        <input onChange={handleChange} name="url" value={blogInput.url} />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
