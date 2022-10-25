const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/shareLocation.controller");
const authMiddleware = require("../middleware/auth.middleware");

route.post("", authMiddleware.isUser, controller.createShareLocation);
route.get("", authMiddleware.isUser, controller.getListShareLocation);

module.exports = route;
