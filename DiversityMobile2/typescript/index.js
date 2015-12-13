// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var React = require('react');
var ReactDOM = require('react-dom');
var DiversityMobile2;
(function (DiversityMobile2) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            ReactDOM.render(React.createElement("h1", null, "Hello, world!"), document.getElementById('example'));
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