const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    // Get user in JSON format
    const user = await User.findOne({ username: body.username }).lean()
    if (!user) return response.status(401).json({ error: 'invalid username' })
    // Compare password
    const passwordCorrect = await bcryptjs.compare(body.password, user.passwordHash)
    if (!passwordCorrect) return response.status(401).json({ error: 'invalid password' })

    // Sign token
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    user.token = jwt.sign(userForToken, SECRET)
    delete user._id
    delete user.__v
    delete user.passwordHash
    response.status(200).json(user)
  } catch(exception) {
    next (exception)
  }
})

module.exports = loginRouter