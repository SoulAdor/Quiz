const quizzesRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Quiz = require('../models/quiz')
const User = require('../models/user')

quizzesRouter.get('/', async (request, response) => {
  const quizzes = await Quiz.find({}).populate('creator', { username: 1, name: 1, id: 1 })
  response.json(quizzes.map(quiz => quiz.toJSON()))
})

quizzesRouter.post('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) return  response.status(401).json({ error: 'invalid token' })

    // Find user with given id
    const user = await User.findById(decodedToken.id)
    if (!user) return  response.status(401).json({ error: 'no user' })

    // Save quiz
    const quiz = new Quiz({ ...request.body, creator: user.id })
    const savedQuiz = await quiz.save()

    // Update user
    user.quizzes = user.quizzes.concat(savedQuiz._id)
    await user.save()

    // Return populated quiz
    const populatedQuiz = await Quiz.findOne(savedQuiz).populate('creator', { username: 1, name: 1, id: 1 })
    response.status(201).json(populatedQuiz)
  } catch(exception) {
    next (exception)
  }
})

quizzesRouter.delete('/:id', async (request, response, next) => {
  try {
    const quiz = await Quiz.findById(request.params.id)
    if (!quiz) return  response.status(404).json({ error: 'Quiz not found' })

    await Quiz.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = quizzesRouter