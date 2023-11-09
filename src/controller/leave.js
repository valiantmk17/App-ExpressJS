  const leaveModels = require('../models/leave');
  const jwt = require("jsonwebtoken");
  const config = require("../config/auth.js");

  const getAllLeave = async (req, res) => {
    try {
      const dataDB = await leaveModels.getAllLeave();

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

  const getIdLeave = async (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({
        message: "No token provided!",
      });
    }

    try {
      const decodedToken = jwt.verify(token.replace("Bearer ", ""), config.secret);
      const userId = decodedToken.id;

      const dataDB = await leaveModels.getIdLeave(userId);

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

  const getHD = async (req, res) => {
    try {
      const dataDB = await leaveModels.getHD();

      res.json({
        message: "GET HD data success",
        data: dataDB,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        serverMessage: error.message,
      });
    }
  }

  const createNewLeave = async (req, res) => {
    const { name, role, type, reason, date, period, phone, emergency, status } = req.body;
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
      const status = 'Pending';

      await leaveModels.createNewLeave(userId, userName, role, type, reason, date, period, phone, emergency, status);

      res.json({
        message: "CREATE new user success",
        body: req.body
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        serverMessage: error.message,
      });
    }
  };

  const updateLeave = async (req, res) => {
    const leaveId = req.params.id;
    const { status } = req.body;

    try {
      await leaveModels.updateLeave(leaveId, status);

      res.json({
        message: "UPDATE user success",
        body: {
          id: leaveId,
          status,
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        serverMessage: error.message,
      });
    }
  };

  const deleteLeave = async (req, res) => {
    const leaveId = req.params.id;

    try {
      await leaveModels.deleteLeave(leaveId);
      res.json({
        message: `DELETE user ID ${leaveId} success`,
        body: null
      });
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        serverMessage: error.message,
      });
    }
  };

  module.exports = {
    getAllLeave,
    getIdLeave,
    getHD,
    createNewLeave,
    updateLeave,
    deleteLeave,
  }
