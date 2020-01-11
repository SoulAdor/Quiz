
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const quizzesRouter = require('./controllers/quizzes')
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {logger.info('connected to MongoDB')})
  .catch((error) => {logger.info('error connecting to MongoDB:', error.message)})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/quizzes', quizzesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app