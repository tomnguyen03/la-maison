const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ShareLocation = new Schema(
  {
    accountId: {
      type: ObjectId,
      ref: 'account',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    style: {
      type: String,
      required: false
    },
    detail_address: {
      type: String,
      required: false
    },
    instagram: {
      type: String,
      required: false
    },
    facebook: {
      type: String,
      required: false
    },
    website: {
      type: String,
      required: false
    },
    approval: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('share_location', ShareLocation)
