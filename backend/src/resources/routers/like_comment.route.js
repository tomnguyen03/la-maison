const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/like_comment.controller");

//import middleware
const authMiddleware = require("../../resources/middleware/auth.middleware");

route.post("/:id", authMiddleware.isUser, controller.createLikeComment);
route.get("/:id", controller.getLikeCommentByCommentId);
route.delete("/:id", authMiddleware.isUser, controller.deleteLikeCommentByAccountId);

module.exports = route;
