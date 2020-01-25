const submissionsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const Submission = require('../models/submission')
const User = require('../models/user')

submissionsRouter.get('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, SECRET)

    // Find user with given id
    const user = await User.findById(decodedToken.id)
    if (!user) return  response.status(401).json({ error: 'no user' })

    const submissions = await Submission.find({ user : user.id })
    response.json(submissions.map(submission => submission.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

submissionsRouter.post('/', async (request, response, next) => {
  try {
    // Check token
    const token = request.token
    if (!token) return response.status(401).json({ error: 'token missing' })
    const decodedToken = jwt.verify(token, SECRET)

    // Find user with given id
    const user = await User.findById(decodedToken.id)
    if (!user) return response.status(401).json({ error: 'no user' })

    // Save submission
    const submission = new Submission({ ...request.body, user: user.id })
    const savedSubmission = await submission.save()

    // Update user
    user.submissions = user.submissions.concat(savedSubmission.id)
    await user.save()

    response.status(201).json(savedSubmission)
  } catch(exception) {
    next (exception)
  }
})

module.exports = submissionsRouter