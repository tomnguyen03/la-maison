const likeCommentService = require('../services/like_comment.service')

const likeCommentController = {
  createLikeComment: async (req, res) => {
    try {
      const accountId = req.user._id

      const data = {
        accountId: accountId,
        commentId: req.params.id
      }
      const like_comment = await likeCommentService.createOne(data)

      return res
        .status(200)
        .json({
          message: 'Successfully',
          data: like_comment ? true : false
        })
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, data: error })
    }
  },

  getLikeCommentByCommentId: async (req, res) => {
    try {
      const commentId = req.params.id

      const itemLikeComment = await likeCommentService.find({
        commentId: commentId
      })

      const response = {
        message: 'Sucessfully',
        data: itemLikeComment
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  },

  getLikeCommentByAccountId: async (req, res) => {
    try {
      const commentId = req.params.id

      const itemLikeComment = await likeCommentService.findOne({
        accountId: req.user._id,
        commentId: commentId
      })

      const response = {
        message: 'Sucessfully',
        data: (itemLikeComment && true) || false
      }

      return res.json(response)
    } catch (error) {
      console.log(error)
    }
  },

  deleteLikeCommentByAccountId: async (req, res) => {
    try {
      const commentId = req.params.id

      await likeCommentService.deleteOne({
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

module.exports = likeCommentController
