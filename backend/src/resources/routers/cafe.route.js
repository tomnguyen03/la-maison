const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/cafe.controller')
const authMiddleware = require('../middleware/auth.middleware')

route.post('', authMiddleware.isStaff, controller.createCafe)
route.get('', controller.getListCafe)
route.put(
  '/updateAllLocation',
  authMiddleware.isStaff,
  controller.updateAllCafe
)
route.get(
  '/recommends',
  authMiddleware.isOptionLogin,
  controller.getCafesRecommend
)
route.get('/location', controller.getListLocationCafe)
route.get('/search', controller.searchCafe)
route.get(
  '/:id',
  authMiddleware.isOptionLogin,
  controller.getCafeDetail
)
route.put(
  '/updateActive',
  authMiddleware.isAdmin,
  controller.updateActive
)

module.exports = route
