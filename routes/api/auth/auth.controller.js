const express = require('express');
const passport = require('passport');

const OAuth2Strategy = require('passport-oauth2').Strategy;
require('../../../bin/passport');

module.exports = {
    auth: function (req, res, next) {
        passport.authenticate('oauth2')(req, res, next);
    },

    logout: function (req, res) {
        req.session.destroy();
        res.render('index', {UserInfo: {state: 'unauthed'}});
    }
};