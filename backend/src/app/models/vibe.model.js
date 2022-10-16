const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vibe = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vibe", Vibe);
