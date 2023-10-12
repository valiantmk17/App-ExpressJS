const authJwt = require('../middleware/authJwt');
const express = require('express');
const attendanceController = require('../controller/attendance');
const router = express.Router();

router.get('/',[authJwt.verifyToken], attendanceController.getAllAttendance);
router.post('/',[authJwt.verifyToken], attendanceController.createNewAttendance);
router.patch('/:id',[authJwt.verifyToken], attendanceController.updateAttendance);
router.delete('/:id',[authJwt.verifyToken], attendanceController.deleteAttendance);

module.exports = router;
 