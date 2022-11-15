const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Style = new Schema(
  {
    name: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('style', Style)
