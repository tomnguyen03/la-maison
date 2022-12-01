const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/comment.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.post('', authMiddleware.isOptionLogin, controller.createComment)
route.get(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.getListComment
)

module.exports = route
