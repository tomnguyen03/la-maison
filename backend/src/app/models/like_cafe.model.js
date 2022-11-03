const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LikeCafe = new Schema({
  accountId: {
    type: ObjectId,
    ref: "account",
    required: true,
  },
  cafeId: {
    type: ObjectId,
    ref: "coffee",
    required: true,
  },
});

module.exports = mongoose.model("like_coffee", LikeCafe);
