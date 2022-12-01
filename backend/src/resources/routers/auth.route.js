const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.post('/register/user', controller.registerUser)
route.post('/login', controller.login)
route.put('/update', authMiddleware.isOptionLogin, controller.update)
route.put(
  '/change-password',
  authMiddleware.isOptionLogin,
  controller.changePassword
)
route.get(
  '/statistical',
  authMiddleware.isAdmin,
  controller.statistical
)
route.get('/user', authMiddleware.isAdmin, controller.getAllUser)

module.exports = route
