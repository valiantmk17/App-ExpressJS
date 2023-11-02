const jwt = require('jsonwebtoken');
const config = require('../config/auth');

// Controller untuk memeriksa token JWT dan mengambil informasi dari token
const checkToken = (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), config.secret);
    const { email, userId } = decodedToken;

    // Di sini Anda dapat melakukan apa pun yang perlu dilakukan dengan informasi pengguna yang sudah ada dalam token JWT

    res.status(200).json({ email, userId });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
};

module.exports = { checkToken };
