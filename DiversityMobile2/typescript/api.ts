import rest = require('rest');

interface UserInfo {
    Provider: String;
    IsRegistered: boolean;
    Email: String;
}

export = class API {
    constructor(
        private client: rest.Client,
        private api_base: String = "https://diversityapi.azurewebsites.net"
    ) { }

    private url_userinfo = this.api_base + "/account/GetUserInfo";
    userInfo() {
        return this.client({
            path: this.url_userinfo
        }).then(function (resp) {
            return resp.entity as UserInfo;
        });
    }

    private url_registerext = this.api_base + "/account/RegisterExternal";
    registerExternal() {
        return this.client({
            path: this.url_registerext,
            method: 'POST'
        });
    }

    private url_setbackend = this.api_base + "/account/Set";
    setBackendCredentials(user: String, pass: String) {
    }
}