var _ = require('lodash')


const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, likes) => acc + likes)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  const authorCount = _.countBy(blogs, 'author')
  const authorBlogs = _.map(authorCount, (value, key) => ({
    author: key,
    blogs: value
  }))
  return (_.maxBy(authorBlogs, 'blogs'))
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const authorLikes = _.map(authors, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }))
  return (_.maxBy(authorLikes, 'likes'))
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
}