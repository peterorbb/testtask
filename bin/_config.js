const express = require('express');

const keys = {
    clientID: 'id',
    secret: 'secret',
    authorizationURL: 'http://authorize',
    tokenURL: 'http://token',
    callbackURL: 'http://callback'
};

module.exports = keys;
