const authJwt = require('../middleware/authJwt');
const express = require('express');
const attendanceController = require('../controller/attendance');
const router = express.Router();

router.get('/', attendanceController.getAllAttendance);
router.post('/',[authJwt.verifyToken], attendanceController.createNewAttendance);
router.patch('/:id',[authJwt.verifyToken], attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
 