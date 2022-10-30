const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/image.controller");

route.post("", controller.fileUpload);

module.exports = route;
