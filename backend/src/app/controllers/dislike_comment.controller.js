const dislikeCommentService = require('../services/dislike_comment.service')

const dislikeCommentController = {
  createDislikeComment: async (req, res) => {
    try {
      const accountId = req.user._id

      const data = {
        accountId: accountId,
        commentId: req.params.id
      }
      await dislikeCommentService.createOne(data)

      return res.status(200).json({ message: 'Successfully' })
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: error })
    }
  },

  getDislikeCommentByCommentId: async (req, res) => {
    try {
      const commentId = req.params.id

      const itemDislikeComment = await dislikeCommentService.find({
        commentId: commentId
      })

      const response = {
        message: 'Sucessfully',
        data: itemDislikeComment
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  },

  getDislikeCommentByAccountId: async (req, res) => {
    try {
      const commentId = req.params.id

      const itemDislikeComment = await dislikeCommentService.findOne({
        accountId: req.user._id,
        commentId: commentId
      })

      const response = {
        message: 'Sucessfully',
        data: (itemDislikeComment && true) || false
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  },

  deleteDislikeCommentByAccountId: async (req, res) => {
    try {
      const commentId = req.params.id

      await dislikeCommentService.deleteOne({
        accountId: req.user._id,
        commentId: commentId
      })

      const response = {
        message: 'Sucessfully'
      }

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = dislikeCommentController
