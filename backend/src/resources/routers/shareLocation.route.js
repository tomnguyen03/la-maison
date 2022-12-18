const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/shareLocation.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.post('', authMiddleware.isStaff, controller.createShareLocation)
route.get('', authMiddleware.isStaff, controller.getListShareLocation)
route.put(
  '/update',
  authMiddleware.isStaff,
  controller.updateShareLocation
)

module.exports = route
