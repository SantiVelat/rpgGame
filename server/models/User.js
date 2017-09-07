const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  currentHistory: {
    type: Number,
    required: true,
    default: 1
  },
  currentHealth: {
  	type: Number,
  	default: 100
  }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
