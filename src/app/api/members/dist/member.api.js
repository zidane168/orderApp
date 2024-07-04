"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var common_axios_1 = require("@/utils/axios/common.axios");
var memberApi = {
    register: function (payload) {
        return common_axios_1["default"].post("/api/v1/members/register.json", __assign({}, payload));
    },
    getProfile: function () {
        var token = localStorage.getItem('token');
        return common_axios_1["default"].post("/api/v1/members/getProfile.json", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    },
    login: function (payload) {
        payload.type = 2;
        return common_axios_1["default"].post("/api/v1/members/login.json", __assign({}, payload));
    }
};
exports["default"] = memberApi;
