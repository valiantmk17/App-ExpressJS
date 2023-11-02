const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');

// Middleware untuk memeriksa otentikasi pengguna berdasarkan token JWT
const checkAuth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userData = decoded;
    next();
  });
};

module.exports = { checkAuth };
