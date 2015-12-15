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
var interceptor = require('rest/interceptor');
var DiversityMobile2;
(function (DiversityMobile2) {
    "use strict";
    var api_server = "https://diversityapi.azurewebsites.net";
    var api_base = api_server + "/api";
    var ext_logins = api_base + "/account/ExternalLogins?returnUrl=%2F&generateState=true";
    var correlationState = {
        cookieName: ".AspNet.Correlation.",
        cookieValue: ""
    };
    var correlationInterceptor = interceptor({
        response: function (response, config, meta) {
            var set_cookies = response.headers["Set-Cookie"];
            if (set_cookies) {
                // if only a single header, wrap it in an array
                if (typeof (set_cookies) === 'string') {
                    set_cookies = [set_cookies];
                }
                for (var i = 0; i < set_cookies.length; i++) {
                    var cookie = set_cookies[i];
                    var nv = cookie.split('=');
                    var name = nv[0];
                    if (name === correlationState.cookieName) {
                        correlationState.cookieValue = cookie;
                    }
                }
            }
            return response;
        },
        request: function (request, config, meta) {
            if (correlationState.cookieValue) {
                var cookies = request.headers["Cookie"];
                if (cookies !== "") {
                    cookies += "; ";
                }
                cookies += correlationState.cookieValue;
                request.headers["Cookie"] = cookies;
            }
            return request;
        }
    });
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onLoginClick() {
            //hello('windows').login();
            var client = rest
                .wrap(mime);
            client(ext_logins).then(function (response) {
                var entity = response.entity[0];
                var uri = api_server + entity.Url;
                var browser = window.open(uri);
                browser.addEventListener("loadstart", function (event) {
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
            hello.init({
                windows: '000000004C0FE46A'
            }, { redirect_uri: 'https://diversityapi.azurewebsites.net/redirect.html' });
            hello.on('auth.login', onLogin);
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