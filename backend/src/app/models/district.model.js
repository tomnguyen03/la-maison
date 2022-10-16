const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const District = new Schema({
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
  province_code: {
    type: Int32Array,
    required: true,
  },
  ward: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("district", District);
