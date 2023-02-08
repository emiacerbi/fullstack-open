import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogInput, setBlogInput] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBlogInput({
      ...blogInput,
      [name]: value,
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    createBlog(blogInput)

    setBlogInput({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <form onSubmit={handleCreate} className="flex flex-col gap-4">
      <h2 className="text-2xl">Create new</h2>

      <div>
        title:
        <input
          onChange={handleChange}
          aria-label="title"
          name="title"
          value={blogInput.title}
          className="border ml-2 rounded-md px-2"
        />
      </div>
      <div>
        author:
        <input
          aria-label="author"
          onChange={handleChange}
          name="author"
          value={blogInput.author}
          className="border ml-2 rounded-md px-2"
        />
      </div>
      <div>
        url:
        <input
          aria-label="url"
          onChange={handleChange}
          name="url"
          value={blogInput.url}
          className="border ml-2 rounded-md px-2"
        />
      </div>

      <button
        className="bg-yellow-400 rounded-md py-1 px-4 max-w-[100px]"
        id="create-blog-button"
        type="submit"
      >
        Create
      </button>
    </form>
  )
}

export default BlogForm
