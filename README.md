README.md for Test task.

Server side:
Server side of the application divided into several pieces. 
Main file is app.js, it contains all of the routes. When application is started, a check is performed to see if the user is authorized or not. If the user is authorized, his profile information is shown. To get user information, application is sending a curl request with authorization token, obtained from the login procedure. Curl request was chosen over http because it is more simple and clear. If the user is not authorized, then he can go through the authorization procedure: he will be redirected to the authorization site, where he must perform a log in using his login name and password, and then he will be redirected back to the index page of the application, and then his personal information will be automatically loaded.  
Passport.js contains authorization strategy for this application. 
Client Id and Client Secret are stored in config.js; it should be noted that _config.js, included with the application, DOES NOT contain Secret and Id, and it should be renamed into config.js and edited accordingly (i. e. you should put your Secret and Id into config.js).

Client side:
Index.html is used to show all the information to the user.
JQuery-3-1-1.js is a jQuery library, that is used for some UI enhancements and for the AJAX requests.
Style.css contains styles for the application.
Client.js is a client side of the application. It has several AJAX requests, and also some logic that controls visibility of some elements. For example, client.js controls the login and logout links, making them accessible/inaccessible depending on the situation.

Installation:
To install the application, you can clone the repo, then in the installation directory you should perform ‘nom install’.

Running the app:
To run the app, you should go to the installation directory and perform ’nom start’.