
const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((acc, likes) => acc + likes)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

module.exports = {
  totalLikes, favoriteBlog
}