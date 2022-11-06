const commentModel = require("../models/comment.model");

const commentService = {
  createOne: async (data) => {
    try {
      const comment = new commentModel(data);
      return comment.save();
    } catch (error) {
      return error;
    }
  },

  find: async (data) => {
    try {
      return commentModel.find(data).populate("accountId");
    } catch (error) {
      return error;
    }
  },

  findOne: async (data) => {
    try {
      return commentModel.findOne(data);
    } catch (error) {
      return error;
    }
  },

  deleteOne: async (data) => {
    try {
      return commentModel.deleteOne(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = commentService;
