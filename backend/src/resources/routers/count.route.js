const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/count_view.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.put('', controller.createCount)
route.get('', authMiddleware.isAdmin, controller.getCount)

module.exports = route
