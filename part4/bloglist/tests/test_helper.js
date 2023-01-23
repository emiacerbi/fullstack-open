const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Emi',
    url: 'emiliano.com',
    likes: 22,
  },
  {
    title: 'Second blog',
    author: 'Carlos',
    url: 'carlos.com',
    likes: 12,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will remove',
    author: 'will remove',
    url: 'will remove',
    likes: 1,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
