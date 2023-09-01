const express = require("express")
const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller")
const router = express.Router()

router.route("/users").get(userController.listUsers).post(userController.createUser)
router.param("userId", userController.getUserById)

module.exports = router

