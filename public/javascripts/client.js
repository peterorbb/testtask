$(document).ready(
    function () {
        init();
    });

function init() {

    if (~document.cookie.indexOf('isAuthenticated=true') && window.location.pathname!='/user') window.location = 'user';

    // logout click
    $('#logout').on('click', logout);
}

function logout() {

    $.ajax({
        url: "/auth/logout",
        method: "GET"
    }).then(function () {
        document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location = '/';
    })
}