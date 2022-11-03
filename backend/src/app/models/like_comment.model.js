const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LikeComment = new Schema({
  accountId: {
    type: ObjectId,
    ref: "account",
    required: true,
  },
  commentId: {
    type: ObjectId,
    ref: "comment",
    required: true,
  },
});

module.exports = mongoose.model("like_comment", LikeComment);
