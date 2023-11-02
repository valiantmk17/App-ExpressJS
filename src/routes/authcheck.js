const express = require('express');
const authcheckController = require('../controller/authcheck.js')
const authcheckmiddleware = require('../middleware/authcheckJWT.js')
const router = express.Router();

router.get('/protected', authcheckmiddleware.checkAuth, authcheckController.checkToken);

module.exports = router;