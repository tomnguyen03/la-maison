const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bookmark = new Schema(
  {
    accountId: {
      type: ObjectId,
      ref: "account",
      required: true,
    },
    collectionId: {
      type: ObjectId,
      ref: "collection",
      required: true,
    },
    cafeId: {
      type: ObjectId,
      ref: "coffee",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookmark", Bookmark);
