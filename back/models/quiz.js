const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate : { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },

  problems: [{
    statement : { type: String, required: true },
    submission : {
      type : { type: Number, required: true },
      options : [{
        text : { type: String, required: true },
        correct : { type: Boolean, required: true }
      }]
    }
  }]
})

const objectToJson = object => {
  object.id = object._id.toString()
  delete object._id
  return object
}

const objectsToJson = objects => {
  return objects.map (object => objectToJson (object) )
}

const problemToJson = problem => {
  const options = objectsToJson(problem.submission.options)
  const submission = { ...problem.submission, options }
  return objectToJson ({ ...problem, submission })
}

quizSchema.set('toJSON', {
  transform: (document, returnedQuiz) => {
    console.log(returnedQuiz)
    returnedQuiz = objectToJson (returnedQuiz)
    returnedQuiz.problems = returnedQuiz.problems.map (problem => problemToJson (problem))
    delete returnedQuiz.__v
  }
})

module.exports = mongoose.model('Quiz', quizSchema)