var _ = require('lodash')


const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, likes) => acc + likes)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  var result = _(blogs)
    .countBy(x => x.author)
    .map((value, key) => ({ author: key, blogs: value }))
    .value()

  return result.reduce(function (prev, current) {
    return (prev.y > current.y) ? prev : current
  })
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs
}