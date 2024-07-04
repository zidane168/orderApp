"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var configs_1 = require("../configs");
var common_helpers_1 = require("../helpers/common/common.helpers");
var commonAxios = axios_1["default"].create({
    baseURL: "" + configs_1.commonConfig.API_HOST,
    headers: {
        Language: 'en_US',
        'Content-Type': 'application/json'
    }
});
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
            req.data = JSON.stringify(req.data);
            console.log('------>');
            console.log(req);
            console.log('------>');
            // if (!(req.data instanceof FormData) && !!req.data) {
            //   req.data = formatFormData(req.data);  
            // }
            break;
        }
        case "PUT": {
            if (!(req.data instanceof FormData) && !!req.data) {
                req.data = common_helpers_1.formatFormData(req.data);
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
