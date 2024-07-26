'use client';
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
exports.formattedPrice = exports.capitalizeFirstLetterAllWords = exports.capitalizeFirstLetter = exports.formatParagraph = exports.randomId = exports.isExpired = exports.gotoPage = exports.getNotifyTime = exports.getHourMinute = exports.getYYYYMMDD = exports.getDDMMYYYY = exports.sleep = exports.parseStyles = exports.formatFormData = exports.decodeHTML = exports.isNumber = exports.isEmpty = exports.isIOS = exports.isMobile = void 0;
var router_1 = require("next/router");
exports.isMobile = function () {
    return (typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};
exports.isIOS = function () {
    return (typeof window !== "undefined" &&
        ([
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
        ].includes(navigator.platform) ||
            navigator.userAgent.includes("Mac")));
};
exports.isEmpty = function (val) {
    return (["", null, undefined].includes(val) ||
        (Array.isArray(val) && val.length === 0));
};
exports.isNumber = function (number) {
    return !exports.isEmpty(number) && !isNaN(Number(number));
};
exports.decodeHTML = function (input) {
    var e = document.createElement("textarea");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue || "";
};
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
exports.parseStyles = function (stringStyles) {
    return typeof stringStyles === "string"
        ? stringStyles.split(";").reduce(function (acc, style) {
            var _a;
            var colonPosition = style.indexOf(":");
            if (colonPosition === -1) {
                return acc;
            }
            var camelCaseProperty = style
                .substr(0, colonPosition)
                .trim()
                .replace(/^-ms-/, "ms-")
                .replace(/-./g, function (c) { return c.substr(1).toUpperCase(); }), value = style.substr(colonPosition + 1).trim();
            return value ? __assign(__assign({}, acc), (_a = {}, _a[camelCaseProperty] = value, _a)) : acc;
        }, {})
        : {};
};
exports.sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.getDDMMYYYY = function (inpDate) {
    if (!inpDate)
        return "";
    if ((typeof inpDate === "string" && inpDate == null) || inpDate.length == 0)
        return "";
    if (typeof inpDate === "number")
        inpDate = inpDate * 1000;
    var _date = new Date(inpDate);
    var _day = _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate().toString();
    var _month = _date.getMonth() + 1 < 10
        ? "0" + (_date.getMonth() + 1)
        : (_date.getMonth() + 1).toString();
    return _day + "." + _month + "." + _date.getFullYear();
};
exports.getYYYYMMDD = function (inpDate) {
    if (!inpDate)
        return "";
    if ((typeof inpDate === "string" && inpDate == null) || inpDate.length == 0)
        return "";
    if (typeof inpDate === "number")
        inpDate = inpDate * 1000;
    var _date = new Date(inpDate);
    var _day = _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate().toString();
    var _month = _date.getMonth() + 1 < 10
        ? "0" + (_date.getMonth() + 1)
        : (_date.getMonth() + 1).toString();
    return _date.getFullYear() + "/" + _month + "/" + _day;
};
exports.getHourMinute = function (strDate) {
    if (strDate == null || strDate.length == 0)
        return "0:00";
    var _date = new Date(strDate);
    return _date.getHours() + ":" + _date.getMinutes();
};
exports.getNotifyTime = function (_pushed) {
    var pushed = new Date(_pushed);
    var today = new Date();
    if (today.getFullYear === pushed.getFullYear &&
        today.getMonth() === pushed.getMonth()) {
        if (today.getDate() == pushed.getDate())
            return "Today";
        else {
            //yesterday
            if (new Date(today.setDate(today.getDate() - 1)).getDate() ==
                pushed.getDate())
                return "Yesterday";
        }
    }
    else
        return exports.getDDMMYYYY(_pushed);
};
exports.gotoPage = function (path, query) {
    if (query === void 0) { query = ""; }
    router_1["default"]
        .push({
        pathname: path,
        search: query
    })
        .then(function () {
        router_1["default"].reload();
    });
};
exports.isExpired = function (expired_date) {
    var now = new Date();
    if (now > expired_date)
        return true;
    return false;
};
exports.randomId = function () {
    var x = new Date();
    return x.getTime() + "." + (Math.random() + 1).toString(36).substring(2);
};
exports.formatParagraph = function (text, signal, link) {
    link = link !== null && link !== void 0 ? link : signal;
    var result = text
        .split(signal)
        .map(function (txt) { return "<p>" + txt + "</p>"; })
        .join("<a >" + signal + "</a>");
    return result;
};
exports.capitalizeFirstLetter = function (input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
};
exports.capitalizeFirstLetterAllWords = function (input) {
    var words = input.split(" ").map(function (word) {
        return exports.capitalizeFirstLetter(word);
    });
    return words.join(" ");
};
exports.formattedPrice = function (price) {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
};
