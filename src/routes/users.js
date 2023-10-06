const authJwt = require('../middleware/authJwt')
const express = require('express')
const userController = require('../controller/users.js')
const router = express.Router()

// router.get("/", [authJwt.verifyToken], (req, res) => {
//   // Contoh logika permission: hanya pengguna dengan peran 'admin' yang bisa mengakses
//   if (req.userId.role !== 'admin') {
//     return res.status(403).json({
//       message: 'Forbidden'
//     });
//   }

router.get("/",[authJwt.verifyToken], userController.getAllUsers)
router.post("/",[authJwt.verifyToken], userController.createNewUser)
router.patch("/:id",[authJwt.verifyToken], userController.updateUser)
router.delete("/:id",[authJwt.verifyToken], userController.deleteUser)

module.exports = router;