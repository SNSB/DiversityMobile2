// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

/// <reference path="typings/cordova/plugins/InAppBrowser.d.ts"/>


import React = require('react');
import ReactDOM = require('react-dom');
import rest = require('rest');
import mime = require('rest/interceptor/mime');
import Dexie = require('dexie');

import DiversityAPI = require('./api');
import Authorization = require('./authorization');
 
module DiversityMobile2 {
    "use strict";
    var api_server = "https://diversityapi.azurewebsites.net"
    var api_base = api_server + "/api";
    var ext_logins = api_base + "/account/ExternalLogins?returnUrl=%2F&generateState=true";
    var ext_register = api_base + "/account/";
    var user_info = api_base + "/account/UserInfo";

    export module Application {
        var Token = "";
        var Client = rest.wrap(mime);
        var APIClient: rest.Client = undefined;

        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);  
        }

        function getAccessToken(url) {
            var prefix = "#access_token=";
            var regex = new RegExp(prefix + "([^&#]+)"),
                results = regex.exec(url);
            return results === null ? "" : results[0].replace(prefix, "");
        }
        
  
        function onLoginClick() {
            Client(ext_logins).then(function (response) {
                var entity = response.entity[0];
                var uri = api_server + entity.Url;

                var browser = ((cordova as any).InAppBrowser as InAppBrowser).open(uri, "_blank", "location=yes");

                browser.addEventListener("loadstart", (event) => {
                    console.log(event);                   

                    var token = getAccessToken(event.url);
                    if (token !== "") {
                        Token = token;

                        APIClient = Client.wrap(Authorization, { token: Token });

                        browser.close();
                    }
                });

                browser.addEventListener("loaderror", (event) => { 
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
                    console.log(resp);

                    if (resp.entity
                });

            var button = ReactDOM.render(
                <button onClick={onLoginClick} > Windows Hello</button>,
                document.getElementById('example') 
            );
        }

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }

    }

    window.onload = function () {
        Application.initialize();
    }
}
