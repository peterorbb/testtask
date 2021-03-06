const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');

router.get('/', UserController.getData);

module.exports = router;
