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

quizSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Quiz', quizSchema)