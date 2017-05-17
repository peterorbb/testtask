const express = require('express');
const router = express.Router();
const passAuth = require('../bin/passport');

router.get('/', function (req, res, next) {
    if (req.query.code) {
        return passAuth.checkOnStart(req, res, next);
    }

    res.render('index', {UserInfo: {state: 'unauthed'}});
});

module.exports = router;