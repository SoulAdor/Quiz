const answersRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const Answer = require('../models/answer')
const User = require('../models/user')

answersRouter.get('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, SECRET)

    // Find user with given id
    const user = await User.findById(decodedToken.id)
    if (!user) return  response.status(401).json({ error: 'no user' })

    const answers = await Answer.find({ user : user.id })
    response.json(answers.map(answer => answer.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

answersRouter.post('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, SECRET)

    // Find user with given id
    const user = await User.findById(decodedToken.id)
    if (!user) return response.status(401).json({ error: 'no user' })

    // Save answer
    const answer = new Answer({ ...request.body, user: user.id })
    const savedAnswer = await answer.save()

    // Update user
    user.answers = user.answers.concat(savedAnswer.id)
    await user.save()

    response.status(201).json(savedAnswer)
  } catch(exception) {
    next (exception)
  }
})

module.exports = answersRouter