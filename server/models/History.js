const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const collection = 'history'

const EnemySchema = new Schema({
  id: Number,
  phaseDescription: String,
  decisions: {
    decision1:
    {
      description: String,
      next: Number
    },
    decision2:
    {
      description: String,
      next: Number
    },
    decision3:
    {
      description: String,
      next: Number
    }
  },
  terrain: String,
  enemies: Array,
  next: Number

}, { collection })

module.exports = mongoose.model('History', EnemySchema)
