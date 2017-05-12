$(document).ready(
    function () {
        
        // state change
        $('#login').on('click', login);
        
        function login () {
            console.log('client@login > RESPONSE');

            $.ajax({
                url: "/login",
                method: "GET"
            }).then(function (res) {
                console.log(res);
            })
        }
    });
