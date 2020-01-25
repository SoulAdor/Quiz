const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz'
  },
  submissionDate : { type: Date, required: true, default: Date.now },

  submissions : [{
    problemId : { type: String, required: true },
    text : { type: String },
    choices : [{
      optionId : { type: String, required: true },
      chosen : { type: Boolean, required: true }
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

const submissionToJson = submission => {
  submission.choices = objectsToJson (submission.choices)
  return objectToJson (submission)
}

submissionSchema.set('toJSON', {
  transform: (document, returnedSubmission) => {
    returnedSubmission = objectToJson (returnedSubmission)
    returnedSubmission.submissions = returnedSubmission.submissions.map (submission => submissionToJson (submission))
    delete returnedSubmission.__v
  }
})

module.exports = mongoose.model('Submission', submissionSchema)