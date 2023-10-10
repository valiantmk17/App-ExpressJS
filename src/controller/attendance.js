const attendanceModel = require('../models/attendance');

const getAllAttendance = async (req, res) => {
  try {
    const attendanceData = await attendanceModel.getAllAttendance();

    res.json({
      message: "GET all attendance success",
      data: attendanceData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

const createNewAttendance = async (req, res) => {
  try {
    const { userId, date, status } = req.body;
    await attendanceModel.createNewAttendance(userId, date, status);

    res.json({
      message: "CREATE new attendance success",
      body: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

const updateAttendance = async (req, res) => {
  const attendanceId = req.params.id;
  const { date, status } = req.body;

  try {
    await attendanceModel.updateAttendance(attendanceId, date, status);

    res.json({
      message: "UPDATE attendance success",
      body: {
        id: attendanceId,
        date,
        status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

const deleteAttendance = async (req, res) => {
  const attendanceId = req.params.id;

  try {
    await attendanceModel.deleteAttendance(attendanceId);

    res.json({
      message: `DELETE attendance ID ${attendanceId} success`,
      body: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllAttendance,
  createNewAttendance,
  updateAttendance,
  deleteAttendance,
};
