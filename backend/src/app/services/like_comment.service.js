const likeCommentModel = require("../models/like_comment.model");

const likeCommentService = {
  createOne: async (data) => {
    try {
      const likeComment = new likeCommentModel(data);
      return likeComment.save();
    } catch (error) {
      return error;
    }
  },

  findOne: async (data) => {
    try {
      return likeCommentModel.findOne(data);
    } catch (error) {
      return error;
    }
  },

  count: async (data) => {
    try {
      return likeCommentModel.count(data);
    } catch (error) {
      return error;
    }
  },

  find: async (data) => {
    try {
      return likeCommentModel.find(data);
    } catch (error) {
      return error;
    }
  },

  deleteOne: async (data) => {
    try {
      return likeCommentModel.deleteOne(data);
    } catch (error) {
      return error;
    }
  },
};

module.exports = likeCommentService;
