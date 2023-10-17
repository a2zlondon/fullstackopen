const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

let token

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    const userForToken = {
      username: user.username,
      id: user.id
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      user.blogs = user.blogs.concat(blogObject._id)
      blogObject.user = user.id
      await blogObject.save()
    }

    await user.save()

  })

  test('blogs are returned as json', async () => {

    await api
      .get('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })

    const title = response.body.map(r => r.title)
    expect(title).toContain(
      'Browser can execute only JavaScript'
    )
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
      // const localToken = jwt.sign(user, process.env.SECRET)
      // await user.save()

      const validNonexistingId = await helper.nonExistingId(user)
      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/blogs/${invalidId}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Jerry Only',
        url: 'https://misfits.com',
        likes: 10,
        user: '65270c9af13231ccbd9c1ca4'
      }

      await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
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

    test('blog without author is not added', async () => {
      const newBlog = {
        title: 'Random title',
        author: '',
        url: 'https://blacksabbath.com',
        likes: 11,
      }

      await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('Defaulted likes to 0', async () => {
      const payload = {
        'title': 'Test Title',
        'author': 'Test Author',
        'url': 'https://www.google.com/',
        'user': ''
      }
      const response = await api
        .post('/api/blogs')
        .send(payload)
        .set({ 'Authorization': `Bearer ${token}` })
        .set('Content-Type', 'application/json')
        .expect(201)

      expect(response.body.likes).toBe(0)
    })

    test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
      expect(response.body[0].id).toBeDefined()
    })

  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })

    test('error when id is not posted', async () => {
      const blogsAtStart = await helper.blogsInDb()

      await api
        .delete('/api/blogs/')
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length
      )

    })
  })

  describe('update a blog', () => {
    test('increment likes with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
      blogToView.likes += 10
      const resultBlog = await api
        .put(`/api/blogs/${blogToView.id}`)
        .set({ 'Authorization': `Bearer ${token}` })
        .send(blogToView)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(resultBlog.body).toEqual(blogToView)
    })

    test('error when increment likes with an invalid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]
      blogToView.likes += 10

      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(blogToView)
        .set({ 'Authorization': `Bearer ${token}` })
        .expect(400)
        .expect('Content-Type', /application\/json/
        )

    })
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})