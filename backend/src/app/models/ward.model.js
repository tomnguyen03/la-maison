const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Ward = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Int32Array,
    required: true,
    unique: true,
  },
  division_type: {
    type: String,
    required: true,
  },
  codename: {
    type: String,
    required: true,
  },
  district_code: {
    type: Int32Array,
    required: true,
  },
});

module.exports = mongoose.model("ward", Ward);
