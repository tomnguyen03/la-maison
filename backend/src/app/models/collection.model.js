const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Collection = new Schema(
  {
    accountId: {
      type: ObjectId,
      ref: "account",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("collection", Collection);
