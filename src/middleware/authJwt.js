// middleware/authJwt.js
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

const permissionAdmin = [
  {
    menuName: 'Employee',
    menuUrl: '/employee',
    access: true,
  },
  {
    menuName: 'Absensi',
    menuUrl: '/absensi',
    access: true,
  },
];

const permissionStaff = [
  {
    menuName: 'Employee',
    menuUrl: '/employee',
    access: false,
  },
  {
    menuName: 'Absensi',
    menuUrl: '/absensi',
    access: true,
  },
];

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      message: "No token provided!"
    });
  }
  token = token.replace("Bearer ","");

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    // Setel permission berdasarkan peran pengguna
    if (decoded.role === 'admin') {
      req.userPermission = permissionAdmin;
    } else {
      req.userPermission = permissionStaff;
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
