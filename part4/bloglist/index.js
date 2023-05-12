const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})




// const express = require('express')
// const app = express()
// const cors = require('cors')
// const morgan = require('morgan')
// require('dotenv').config()

// const Blog = require('./models/blog')

// morgan.token('req-body', function (req) {
//   const body = JSON.stringify(req.body)
//   return body
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// app.use(cors())
// app.use(express.json())
// app.use(express.static('build'))



// app.use(unknownEndpoint)
// app.use(errorHandler)

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })