const router = require('express').Router()
const User = require('../models/user')
const Quiz = require('../models/quiz')
const Submission = require('../models/submission')

router.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Quiz.deleteMany({})
  await Submission.deleteMany({})

  response.status(204).end()
})

module.exports = router