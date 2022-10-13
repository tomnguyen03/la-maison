const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Account = new Schema(
  {
    account_id: {
      type: String,
      ref: "account",
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      minLength: 10,
      maxLength: 11,
      required: false,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    detail_address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account", Account);
