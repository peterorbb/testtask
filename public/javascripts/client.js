$(document).ready(
    function () {
        
        // clicks
        $('#login').on('click', login);
        $('#logout').on('click', logout);
        $('#getuser').on('click', getuser);


        function login () {
            console.log('client@login > RESPONSE');

            $.ajax({
                url: "/auth",
                method: "GET"
            }).then(function (res) {
                console.log(res);
            })
        }


        function logout () {
            console.log('client@logout > RESPONSE');

            $.ajax({
                url: "/logout",
                method: "GET"
            }).then(function (res) {
                console.log(res);
            })
        }


        function getuser () {
            console.log('client@getuser > RESPONSE');

            $.ajax({
                url: "/profile",
                method: "GET"
            }).then(function (res) {
                console.log(res);
                if (res !== 'Unauthorized')
                {
                    var data = JSON.parse(res.data);
                    $('#userinfo').html("");
                    $('#userinfo').append('<div class="userinfo__row"><strong>Profile info:</strong></div>');
                    $('#userinfo').append('<div class="userinfo__row">Username: ' + data.username + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Email: ' + data.emails[0].value + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">User type: ' + data.user_type + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Organization: ' + data.organisation_name + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Full name: ' + data.display_name + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Photo: ' + data.photos[0] + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Created: ' + data.created_at + '</div>');
                    $('#userinfo').append('<div class="userinfo__row">Updated: ' + data.updated_at + '</div>');
                }
                else
                {
                    $('#userinfo').html("");
                    $('#userinfo').append('<div class="userinfo__row"><strong>Access denied!</strong></div>');
                }
            });
        }
    });
