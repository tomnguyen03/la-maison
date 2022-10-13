const express = require("express");
const route = express.Router();
const controller = require("../../app/controllers/auth.controller");

route.post("/register/user", controller.registerUser);
route.post("/login", controller.login);

module.exports = route;
