const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Count = new Schema(
  {
    url: {
      type: String,
      required: true
    },

    views: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('count', Count)
