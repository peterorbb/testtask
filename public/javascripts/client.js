$(document).ready(
    function () {


        if (~document.cookie.indexOf('isAuthenticated=true')) getuser();

        // clicks
        $('#login').on('click', login);
        $('#logout').on('click', logout);
        $('#getuser').on('click', getuser);

        $('#main__logout').css("display", "none");


        function login() {
            //$('#main__title').html('<strong>User profile</strong>');

            //getuser();
        }


        function logout() {

            $.ajax({
                url: "/logout",
                method: "GET"
            }).then(function (res) {
                document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                window.location = '/';
            })
        }


        function getuser() {

            $.ajax({
                url: "/profile",
                method: "GET"
            }).then(function (res) {
                $('#main__title').html('<strong>User profile</strong>');
                $('#main__login').css("display", "none");
                $('#main__getuser').css("display", "none");
                $('#main__logout').css("display", "block");
                if (res.auth === true) {
                    var data = JSON.parse(res.data);
                    $('#userinfo').html("");
                    $('#userinfo').append('<div class="userinfo__row">Username: ' + data.username + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Email: ' + data.emails[0].value + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">User type: ' + data.user_type + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Organization: ' + data.organisation_name + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Full name: ' + data.display_name + '</div>');
                }
                else {
                    $('#userinfo').html("");
                    $('#userinfo').append('<div class="userinfo__row"><strong>Access denied!</strong></div>');
                }
            });
        }
    });
