const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Rating = new Schema({
  accountId: {
    type: ObjectId,
    ref: 'account',
    required: true
  },
  cafeId: {
    type: ObjectId,
    ref: 'coffee',
    required: true
  },
  view_count: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('rating', Rating)
