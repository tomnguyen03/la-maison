const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DisLikeComment = new Schema({
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

module.exports = mongoose.model("dislike_comment", DisLikeComment);
