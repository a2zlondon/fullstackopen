const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

// test('Defaulted likes to 0', async () => {
//   const payload = {
//     'title': 'Test Title',
//     'author': 'Test Author',
//     'url': 'https://www.google.com/',
//   }
//   const response = await api
//     .post('/api/blogs')
//     .send(payload)
//     .set('Content-Type', 'application/json')
//     .expect(201)

//   expect(response.body.likes).toBe(0)
// }, 100000)

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Jerry Only',
    url: 'https://misfits.com',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

// test('blog without title is not added', async () => {
//   const newBlog = {
//     author: 'Tony Iommi',
//     url: 'https://blacksabbath.com',
//     likes: 11,
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)

//   const blogsAtEnd = await helper.blogsInDb()

//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
// })

test('blog without author is not added', async () => {
  const newBlog = {
    title: 'Random title',
    author: '',
    url: 'https://blacksabbath.com',
    likes: 11,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
}, 100000)

test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('HTML is easy')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)
  expect(title).toContain(
    'Browser can execute only JavaScript'
  )
})

test('a specific blog can be viewed', async () => {
  const blogssAtStart = await helper.blogsInDb()

  const blogToView = blogssAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})