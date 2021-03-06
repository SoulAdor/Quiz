const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
  } catch(exception) {
    next (exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.password)  return response.status(400).json({ error: 'No password' })

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(exception) {
    next (exception)
  }
})

module.exports = usersRouter