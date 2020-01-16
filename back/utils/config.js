require('dotenv').config()

const environment = process.env
const PORT = environment.PORT
const SECRET = environment.SECRET
const MONGODB_URI = environment.NODE_ENV === 'test' ? environment.TEST_MONGODB_URI : environment.MONGODB_URI

module.exports = {
  MONGODB_URI,
  SECRET,
  PORT
}