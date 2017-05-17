const express = require('express');
const axios = require('axios');

module.exports = {
    getData: function (req, res, next) {
        const util = require('util');
        let exec = require('child_process').exec;
        let response;

        axios({
            method: 'get',
            url: 'https://staging-auth.wallstreetdocs.com/oauth/userinfo',
            headers: {
                "Authorization": `Bearer ${req.session.accessToken}`,
                "Cache-Control": "no-cache"
            }
        })
            .then(function (response) {

                let data = response.data;
                response = {
                    state: 'authed',
                    name: data.username,
                    email: data.emails[0].value,
                    type: data.user_type,
                    organization: data.organisation_name,
                    fullname: data.display_name
                };
                res.render('index', {UserInfo: response});
            }).catch((err) => {

            response = {state: 'unauthed'};
            res.render('index', {UserInfo: response});
            console.warn('Get User Profile Error:', err.message);
        });

    }
};