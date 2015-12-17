module.exports = (function () {
    function API(client, api_base) {
        if (api_base === void 0) { api_base = "https://diversityapi.azurewebsites.net"; }
        this.client = client;
        this.api_base = api_base;
        this.url_userinfo = this.api_base + "/account/GetUserInfo";
        this.url_registerext = this.api_base + "/account/RegisterExternal";
        this.url_setbackend = this.api_base + "/account/Set";
    }
    API.prototype.userInfo = function () {
        return this.client({
            path: this.url_userinfo
        });
    };
    API.prototype.registerExternal = function () {
        return this.client({
            path: this.url_registerext,
            method: 'POST'
        });
    };
    API.prototype.setBackendCredentials = function (user, pass) {
    };
    return API;
})();
//# sourceMappingURL=api.js.map