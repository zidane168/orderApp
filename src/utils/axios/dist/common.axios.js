"use strict";
exports.__esModule = true;
exports.formatFormData = exports.API_HOST = void 0;
var axios_1 = require("axios");
var configs_1 = require("../configs");
var commonAxios = axios_1["default"].create({
    baseURL: "" + configs_1.commonConfig.API_HOST,
    headers: {
        Language: 'en_US',
        'Content-Type': 'application/json'
    }
});
exports.API_HOST = "" + configs_1.commonConfig.API_HOST;
exports.formatFormData = function (data) {
    var fd = new FormData();
    Object.entries(data).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (Array.isArray(value) && value.some(function (v) { return v instanceof File; })) {
            fd.append(key + "[]", value);
        }
        else {
            fd.append(key, typeof value === "string" || value instanceof File
                ? value
                : JSON.stringify(value));
        }
    });
    return fd;
};
commonAxios.interceptors.request.use(function (req) {
    if (typeof req.headers["Language"] === "undefined" &&
        typeof window !== "undefined")
        req.headers["Language"] = 'en_US'; //window.NextPublic.lang.replace("-", "_");
    switch (req.method.toUpperCase()) {
        case "GET": {
            req.params = req.params || {};
            break;
        }
        case "POST": {
            if (!(req.data instanceof FormData) && !!req.data) {
                req.data = exports.formatFormData(req.data);
                console.log(' --0-00-> ');
                console.log(req.data);
            }
            break;
        }
        case "PUT": {
            if (!(req.data instanceof FormData) && !!req.data) {
                req.data = exports.formatFormData(req.data);
                // req.data = commonHelpers.formatFormData(req.data);
            }
            break;
        }
    }
    return req;
}, function (err) {
    console.log(err);
    return Promise.reject(err);
});
commonAxios.interceptors.response.use(function (res) {
    // if (!["", null, undefined].includes(res?.data?.error_code)) {
    // 	// helpers.axios.allocateRoute(res.data.error_code)
    // }
    return res;
}, function (err) {
    console.log(err);
    return Promise.reject(err);
});
exports["default"] = commonAxios;
