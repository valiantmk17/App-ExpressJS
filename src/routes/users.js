const authJwt = require('../middleware/authJwt')
const express = require('express')
const userController = require('../controller/users.js')
const router = express.Router()

router.get("/",[authJwt.verifyToken], userController.getAllUsers)
router.post("/",[authJwt.verifyToken], userController.createNewUser)
router.patch("/:id",[authJwt.verifyToken], userController.updateUser)
router.delete("/:id",[authJwt.verifyToken], userController.deleteUser)

module.exports = router;