const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');

router.get('/', AuthController.auth);
router.get('/logout', AuthController.logout);

module.exports = router;


