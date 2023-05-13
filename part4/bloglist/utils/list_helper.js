
const totalLikes = (blogs) => {
  var sum = blogs.map(blog => blog.likes).reduce((acc, likes) => acc + likes)
  return sum
}

module.exports = {
  totalLikes
}