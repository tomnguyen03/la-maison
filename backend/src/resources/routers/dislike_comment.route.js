const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/dislike_comment.controller')

//import middleware
const authMiddleware = require('../../resources/middleware/auth.middleware')

route.post(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.createDislikeComment
)
route.get('/:id', controller.getDislikeCommentByCommentId)
route.delete(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.deleteDislikeCommentByAccountId
)

module.exports = route
