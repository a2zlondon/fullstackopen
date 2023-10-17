const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'salainen'
  }
]

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Jimmy Badmann',
    url: 'https://htmliseasy.com',
    likes: 6,
    user: null
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Billy Nomates',
    url: 'https://only-javaScript.com',
    likes: 9,
    user: null
  },
]

const nonExistingId = async (user) => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremovethissoon',
    url: 'willremovethissoon',
    likes: 0,
    user: user._id
  })

  await blog.save()
  const removedBlog = await Blog.findByIdAndRemove(blog._id)

  return removedBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers, initialBlogs, nonExistingId, blogsInDb, usersInDb
}