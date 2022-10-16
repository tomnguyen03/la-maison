const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Province = new Schema({
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
  phone_code: {
    type: Int32Array,
    required: true,
  },
  districts: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("province", Province);
