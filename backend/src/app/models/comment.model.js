const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Comment = new Schema(
  {
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
    content: {
      type: String,
      required: true
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('comment', Comment)
