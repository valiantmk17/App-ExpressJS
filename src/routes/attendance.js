const authJwt = require('../middleware/authJwt');
const express = require('express');
const attendanceController = require('../controller/attendance');
const router = express.Router();

router.get('/',[authJwt.verifyToken], attendanceController.getAllAttendance);
router.get('/idAttendance',[authJwt.verifyToken], attendanceController.getIdAttendance)
router.post('/',[authJwt.verifyToken], attendanceController.createNewAttendance);
router.patch('/:id',[authJwt.verifyToken], attendanceController.updateAttendance);
router.delete('/:id',[authJwt.verifyToken], attendanceController.deleteAttendance);
router.get('/status', [authJwt.verifyToken], attendanceController.getAttendanceStatus);
router.post('/leave', [authJwt.verifyToken], attendanceController.applyForLeave);

module.exports = router;
 