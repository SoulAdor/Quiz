const router = require('express').Router()
const User = require('../models/user')
const Quiz = require('../models/answer')
const Answer = require('../models/answer')

router.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Quiz.deleteMany({})
  await Answer.deleteMany({})

  response.status(204).end()
})

module.exports = router