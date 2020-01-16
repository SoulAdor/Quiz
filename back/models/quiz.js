const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate : { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },

  textQuestions: [{
    id : { type: Number, required: true },
    question : { type: String, required: true }
  }],

  multipleChoiceQuestions: [{
    id : { type: Number, required: true },
    question : { type: String, required: true },
    answers : [{
      id : { type: Number, required: true },
      correct : { type: Boolean, required: true },
      answer : { type: String, required: true }
    }]
  }],

  checkboxQuestions: [{
    id : { type: Number, required: true },
    question : { type: String, required: true },
    answers : [{
      id : { type: Number, required: true },
      correct : { type: Boolean, required: true },
      answer : { type: String, required: true }
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

const questionToJson = question => {
  question.answers = objectsToJson (question.answers)
  return objectToJson (question)
}

quizSchema.set('toJSON', {
  transform: (document, returnedQuiz) => {
    returnedQuiz = objectToJson (returnedQuiz)
    returnedQuiz.textQuestions = returnedQuiz.textQuestions.map (question => objectToJson (question))
    returnedQuiz.multipleChoiceQuestions = returnedQuiz.multipleChoiceQuestions.map (question => questionToJson (question))
    returnedQuiz.checkboxQuestions = returnedQuiz.checkboxQuestions.map (question => questionToJson (question))
    delete returnedQuiz.__v
  }
})

module.exports = mongoose.model('Quiz', quizSchema)