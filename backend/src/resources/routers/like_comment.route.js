const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/like_comment.controller')

//import middleware
const authMiddleware = require('../../resources/middleware/auth.middleware')

route.post(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.createLikeComment
)
route.get('/:id', controller.getLikeCommentByCommentId)
route.delete(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.deleteLikeCommentByAccountId
)

module.exports = route
