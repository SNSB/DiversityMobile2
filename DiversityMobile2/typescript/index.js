// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
/// <reference path="typings/cordova/plugins/InAppBrowser.d.ts"/>
var React = require('react');
var ReactDOM = require('react-dom');
var rest = require('rest');
var mime = require('rest/interceptor/mime');
var DiversityAPI = require('./api');
var Authorization = require('./authorization');
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
        function onLoginClick() {
            Client(ext_logins).then(function (response) {
                var entity = response.entity[0];
                var uri = api_server + entity.Url;
                var browser = cordova.InAppBrowser.open(uri, "_blank", "location=yes");
                browser.addEventListener("loadstart", function (event) {
                    console.log(event);
                    var token = getAccessToken(event.url);
                    if (token !== "") {
                        Token = token;
                        APIClient = Client.wrap(Authorization, { token: Token });
                        browser.close();
                    }
                });
                browser.addEventListener("loaderror", function (event) {
                    console.log(event);
                });
            });
        }
        function onDeviceReady() {
            // Handle the Cordova pause and resume events 
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            onLoginClick();
            var api = new DiversityAPI(APIClient);
            api.userInfo()
                .then(function (resp) {
            });
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