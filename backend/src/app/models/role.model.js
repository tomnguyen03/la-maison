const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "user",
      unique: true,
      enum: ["admin", "staff", "user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("role", Role);
