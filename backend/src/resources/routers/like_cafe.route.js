const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/like_cafe.controller')

route.post('/:id', controller.createLikeCafe)
route.get('/:id', controller.getLikeCafeByAccountId)
route.delete('/:id', controller.deleteLikeCafeByAccountId)

module.exports = route
