const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/collection.controller");

route.post("", controller.createCollection);
route.get("", controller.getCollection);

module.exports = route;
