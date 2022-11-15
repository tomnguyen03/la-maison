const dislikeCommentModel = require('../models/dislike_comment.model')

const dislikeCommentService = {
  createOne: async data => {
    try {
      const dislikeComment = new dislikeCommentModel(data)
      return dislikeComment.save()
    } catch (error) {
      return error
    }
  },

  find: async data => {
    try {
      return dislikeCommentModel.find(data)
    } catch (error) {
      return error
    }
  },

  findOne: async data => {
    try {
      return dislikeCommentModel.findOne(data)
    } catch (error) {
      return error
    }
  },

  count: async data => {
    try {
      return dislikeCommentModel.count(data)
    } catch (error) {
      return error
    }
  },

  deleteOne: async data => {
    try {
      return dislikeCommentModel.deleteOne(data)
    } catch (error) {
      return error
    }
  }
}

module.exports = dislikeCommentService
