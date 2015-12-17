// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
/// <reference path="typings/cordova/plugins/InAppBrowser.d.ts"/>
var React = require('react');
var ReactDOM = require('react-dom');
var hello = require('hellojs');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var authorization = require('./authorization');
var DiversityMobile2;
(function (DiversityMobile2) {
    "use strict";
    var api_server = "https://diversityapi.azurewebsites.net";
    var api_base = api_server + "/api";
    var ext_logins = api_base + "/account/ExternalLogins?returnUrl=%2F&generateState=true";
    var ext_register = api_base + "/account/";
    var user_info = api_base + "/account/UserInfo";
    var Application;
    (function (Application) {
        var Token = "";
        var Client = rest.wrap(mime);
        var APIClient = undefined;
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function getAccessToken(url) {
            var prefix = "#access_token=";
            var regex = new RegExp(prefix + "([^&#]+)"), results = regex.exec(url);
            return results === null ? "" : results[0].replace(prefix, "");
        }
        function getProfile() {
            APIClient(user_info).then(function (resp) {
                console.log(resp);
            });
        }
        function onLoginClick() {
            //hello('windows').login();
            Client(ext_logins).then(function (response) {
                var entity = response.entity[0];
                var uri = api_server + entity.Url;
                var browser = cordova.InAppBrowser.open(uri, "_blank", "location=yes");
                browser.addEventListener("loadstart", function (event) {
                    console.log(event);
                    var token = getAccessToken(event.url);
                    if (token !== "") {
                        Token = token;
                        APIClient = Client.wrap(authorization, { token: Token });
                        browser.close();
                        getProfile();
                    }
                });
                browser.addEventListener("loaderror", function (event) {
                    console.log(event);
                });
            });
        }
        function onLogin(auth) {
            // Call user information, for the given network
            hello(auth.network).api('/me').then(function (r) {
                // Inject it into the container
                var label = document.getElementById('profile_' + auth.network);
                if (!label) {
                    label = document.createElement('div');
                    label.id = 'profile_' + auth.network;
                    document.getElementById('profile').appendChild(label);
                }
                label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
            });
            var session = hello(auth.network).getAuthResponse();
        }
        function onDeviceReady() {
            // Handle the Cordova pause and resume events 
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            /*hello.init({
                windows: '000000004C0FE46A'
            }, { redirect_uri: 'https://diversityapi.azurewebsites.net/redirect.html' });*/
            //hello.on('auth.login', onLogin);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            var button = ReactDOM.render(React.createElement("button", {"onClick": onLoginClick}, " Windows Hello"), document.getElementById('example'));
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    })(Application = DiversityMobile2.Application || (DiversityMobile2.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(DiversityMobile2 || (DiversityMobile2 = {}));
//# sourceMappingURL=index.js.map