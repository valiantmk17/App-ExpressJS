const authJwt = require('../middleware/authJwt');
const config = require("../config/auth.js");
const express = require('express')
const leaveController = require('../controller/leave.js')
const router = express.Router()

router.get("/",[authJwt.verifyToken], leaveController.getAllLeave)
router.get("/hd",[authJwt.verifyToken], leaveController.getHD)
router.get("/idleave",[authJwt.verifyToken], leaveController.getIdLeave)
router.post("/",[authJwt.verifyToken], leaveController.createNewLeave)
router.patch("/:id",[authJwt.verifyToken], leaveController.updateLeave)
router.delete("/:id",[authJwt.verifyToken], leaveController.deleteLeave)

module.exports = router;