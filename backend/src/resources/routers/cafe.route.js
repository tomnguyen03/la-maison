const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/cafe.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.post('', authMiddleware.isStaff, controller.createCafe)
route.get('', controller.getListCafe)
route.put(
  '/updateAllLocation',
  authMiddleware.isUser,
  controller.updateAllCafe
)
route.get(
  '/recommends',
  authMiddleware.isOptionLogin,
  controller.getCafesRecommend
)
route.get('/location', controller.getListLocationCafe)
route.get(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.getCafeDetail
)

module.exports = route
