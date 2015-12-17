import interceptor = require('rest/interceptor');

interface Config {
    token?: String;
    //api_base?: String;
}

interface State extends Config {
}

export = interceptor({
    init: function (config: Config) {
        return config as State;
    },
    request: function (request, config, meta) {
        if (config.token) {
            var headers = request.headers || (request.headers = {});
            headers["Authorization"] = "bearer " + config.token;
        }

        return request;
    },
    error: function (response, config, meta) {
        // Unauthorized? -> get a new token and retry
        if (response.status.code == 401) {
            // TODO
        }
        return response;
    }
});
