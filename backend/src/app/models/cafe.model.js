const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cafe = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    detail_address: {
      type: String,
      required: true,
    },
    style_id: {
      type: Array,
      required: true,
    },
    vibe_id: {
      type: Array,
      required: true,
    },
    wardId: {
      type: ObjectId,
      ref: "ward",
      required: true,
    },
    districtId: {
      type: ObjectId,
      ref: "district",
      required: true,
    },
    provinceId: {
      type: ObjectId,
      ref: "province",
      required: true,
    },
    instagram: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    register_by: {
      type: ObjectId,
      ref: "accountId",
      required: true,
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

module.exports = mongoose.model("coffee", Cafe);
