const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  submissionDate : { type: Date, required: true, default: Date.now },

  textAnswers: [{
    questionId : { type: String, required: true },
    answer : { type: String, required: true }
  }],

  multipleChoiceAnswers: [{
    questionId : { type: String, required: true },
    answers : [{
      answerId : { type: String, required: true },
      correct : { type: Boolean, required: true }
    }]
  }],

  checkboxAnswers: [{
    questionId : { type: String, required: true },
    answers : [{
      answerId : { type: String, required: true },
      correct : { type: Boolean, required: true }
    }]
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

const answerToJson = answer => {
  answer.answers = objectsToJson (answer.answers)
  return objectToJson (answer)
}

answerSchema.set('toJSON', {
  transform: (document, returnedAnswer) => {
    returnedAnswer = objectToJson (returnedAnswer)
    returnedAnswer.textAnswers = returnedAnswer.textAnswers.map (question => objectToJson (question))
    returnedAnswer.multipleChoiceAnswers = returnedAnswer.multipleChoiceAnswers.map (answer => answerToJson (answer))
    returnedAnswer.checkboxAnswers = returnedAnswer.checkboxAnswers.map (answer => answerToJson (answer))
    delete returnedAnswer.__v
  }
})

module.exports = mongoose.model('Answer', answerSchema)