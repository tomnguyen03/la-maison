const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.post('/register/user', controller.registerUser)
route.post('/login', controller.login)
route.put('/update', authMiddleware.isUser, controller.update)
route.put(
  '/change-password',
  authMiddleware.isUser,
  controller.changePassword
)
route.get('/statistical', controller.statistical)
route.get('/user', controller.getAllUser)

module.exports = route
