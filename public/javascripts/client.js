$(document).ready(
    function () {
        
        // clicks
        $('#login').on('click', login);
        $('#logout').on('click', logout);


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
    });
