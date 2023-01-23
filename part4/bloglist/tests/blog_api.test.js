const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, nonExistingId } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const noteObjects = initialBlogs.map((note) => new Blog(note))
  const promiseArray = noteObjects.map((note) => note.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('viewing a specific blog', () => {
  test('amount of blogs increases after creating one', async () => {
    const newBlog = {
      title: 'Third',
      author: 'Tincho',
      url: 'tincho.com',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(initialBlogs.length + 1)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })
})

describe('creating a blog', () => {
  test('likes default to 0 when not in request', async () => {
    const noLikesBlog = {
      title: 'The Unlikable',
      author: 'Unlikable',
      url: 'noonelikesme.com',
    }

    const { body } = await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(body.likes).toEqual(0)
  })

  test('should return 400 if missing url or title property', async () => {
    const newBlog = {
      author: 'Unlikable',
      url: 'noonelikesme.com',
      likes: 11,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const authors = blogsAtEnd.map((r) => r.author)

    expect(authors).not.toContain(blogToDelete.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
