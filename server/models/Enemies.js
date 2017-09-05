const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const collection = 'enemies'

const EnemySchema = new Schema({
  id: Number,
  name: String,
  description: String,
  health: Number,
  movements: [{
    probability: Number,
    success: String,
    successDamage: Number,
    fail: String,
    failDamage: Number,
    description: String
  },
  {
    probability: Number,
    success: String,
    successDamage: Number,
    fail: String,
    failDamage: Number,
    description: String
  },
  {
    probability: Number,
    success: String,
    successDamage: Number,
    fail: String,
    failDamage: Number,
    description: String
  }
  ]
}, { collection })

module.exports = mongoose.model('Enemy', EnemySchema)
