const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/comment.controller");
const authMiddleware = require("../middleware/auth.middleware");

route.post("", authMiddleware.isUser, controller.createComment);
route.get("/:id", controller.getListComment);

module.exports = route;
