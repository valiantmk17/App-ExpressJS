const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      message: "No token provided!"
    });
  }
  token = token.replace("Bearer ","")
  console.log(token)
  
  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).json({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;