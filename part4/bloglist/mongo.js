const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const title = process.argv[3]
const author = process.argv[4]
const url = process.argv[5]
const likes = process.argv[6]

const mongourl = `mongodb+srv://fullstackopen:${password}@fullstackopen-phonebook.jyrvi41.mongodb.net/bloglistTest?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(mongourl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if (!title && !author) {

  Blog.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.title} ${p.author}`)
    })
    mongoose.connection.close()
  })
} else {
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  })
  blog.save().then(result => {
    console.log(`added ${result.title} number ${result.author} to bloglist`)
    mongoose.connection.close()
  })
}
