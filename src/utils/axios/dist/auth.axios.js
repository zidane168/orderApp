"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var helpers_1 = require("@/utils/helpers");
var common_helpers_1 = require("@/utils/helpers/common/common.helpers");
var configs_1 = require("../configs");
var authAxios = axios_1["default"].create({
    baseURL: "" + configs_1.commonConfig.API_HOST,
    headers: {
        common: {
            Language: typeof window !== "undefined"
                ? window.NextPublic.lang.replace("-", "_")
                : undefined
        }
    }
});
authAxios.interceptors.request.use(function (req) {
    // const token = jwtService.getToken() || undefined;
    switch (req.method.toUpperCase()) {
        case "GET": {
            req.params = req.params || {};
            // Object.assign(req.params, {
            //   token,
            // });
            break;
        }
        case "POST": {
            if (!(req.data instanceof FormData) && !!req.data) {
                // req.data = commonHelpers.formatFormData(req.data);
                req.data = common_helpers_1.formatFormData(req.data);
            }
            // if (req.data instanceof FormData) {
            // } else {
            //   req.data = req.data || {};
            //   // Object.assign(req.params, {});
            // }
            break;
        }
        case "PUT": {
            if (!(req.data instanceof FormData) && !!req.data) {
                // req.data = commonHelpers.formatFormData(req.data);
                req.data = common_helpers_1.formatFormData(req.data);
            }
            // if (req.data instanceof FormData) {
            //   // req.data.append("language", window.NextPublic.lang);
            // } else {
            //   req.data = req.data || {};
            //   // Object.assign(req.params, {});
            // }
            break;
        }
    }
    return req;
}, function (err) {
    console.log(err.response);
    return Promise.reject(err);
});
authAxios.interceptors.response.use(function (res) {
    if (helpers_1.axiosHelpers.checkRequestInvalidToken(res.data)) {
        // eventBusService.dispatch(eventBusCommonConstants.AUTH_EXPIRED_TOKEN)
    }
    return res;
}, function (err) {
    return Promise.reject(err);
});
exports["default"] = authAxios;
