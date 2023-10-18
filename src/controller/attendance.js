const attendanceModel = require('../models/attendance');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

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

const getIdAttendance = async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), config.secret);
    const userId = decodedToken.id;

    const dataDB = await attendanceModel.getIdAttendance(userId);

    res.json({
      message: "GET all data success",
      data: dataDB,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      serverMessage: error.message,
    });
  }
};

const createNewAttendance = async (req, res) => {
  const { date, status } = req.body;
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), config.secret);
    const userId = decodedToken.id;
    const userName = decodedToken.name;

    await attendanceModel.createNewAttendance(userId, userName, date, status);

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
  getIdAttendance,
  createNewAttendance,
  updateAttendance,
  deleteAttendance,
};
