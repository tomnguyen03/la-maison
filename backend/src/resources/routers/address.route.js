const express = require('express')
const route = express.Router()
const controller = require('../../app/controllers/address.controller')

route.get('/provinces', controller.getAllProvinces)
route.get('/districts/', controller.getDistrictByProvince)
route.get('/wards/', controller.getWardByDistrict)

module.exports = route
