const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/filter.controller')

route.get('/styles', controller.getStyle)
route.get('/vibes', controller.getVibe)

module.exports = route
