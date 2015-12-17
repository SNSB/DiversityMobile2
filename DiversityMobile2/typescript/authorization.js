var interceptor = require('rest/interceptor');
module.exports = interceptor({
    init: function (config) {
        return config;
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
        }
        return response;
    }
});
//# sourceMappingURL=authorization.js.map