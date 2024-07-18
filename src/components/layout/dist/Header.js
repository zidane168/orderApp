'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("next-auth/react");
var link_1 = require("next/link");
var react_2 = require("react");
var member_api_1 = require("@/app/api/members/member.api");
var useSessionData_1 = require("@/customHook/useSessionData");
function Header() {
    var _this = this;
    var session = react_1.useSession();
    var status = session.status;
    var _a = react_2.useState(''), firstName = _a[0], setFirstName = _a[1];
    react_2.useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var session_1, getProfile, res, userData, userName, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, useSessionData_1.useSessionData()]; // must use await this for make asynchoronous and useSessionData is get from a hook 
                    case 1:
                        session_1 = _b.sent() // must use await this for make asynchoronous and useSessionData is get from a hook 
                        ;
                        if (!session_1) return [3 /*break*/, 3];
                        getProfile = member_api_1.memberApi().getProfile;
                        return [4 /*yield*/, getProfile()];
                    case 2:
                        res = _b.sent();
                        if ((res === null || res === void 0 ? void 0 : res.status) === 200 && ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.status) === 200) {
                            userData = res.data.params;
                            userName = (userData === null || userData === void 0 ? void 0 : userData.name) || (userData === null || userData === void 0 ? void 0 : userData.email);
                            session_1.user = userData;
                            if (userName) {
                                setFirstName(userName.split(' ')[0]);
                            }
                        }
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Error fetching profile:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [session]);
    return (React.createElement("header", { className: "flex items-center justify-between" },
        React.createElement("nav", { className: "flex items-center gap-8 font-semibold text-gray-500" },
            React.createElement(link_1["default"], { className: "text-2xl font-semibold text-primary", href: '/' }, " ST PIZZA "),
            React.createElement(link_1["default"], { href: '/' }, " Home "),
            React.createElement(link_1["default"], { href: '/menu' }, " Menu "),
            React.createElement(link_1["default"], { href: '/#about' }, " About "),
            React.createElement(link_1["default"], { href: '/#contact' }, " Contact ")),
        React.createElement("nav", { className: "flex items-center gap-4 font-semibold text-gray-500" },
            status == 'authenticated' && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'w-[150px]' },
                    React.createElement(link_1["default"], { href: '/profile' },
                        " Hello,  ",
                        firstName,
                        " ")),
                React.createElement("button", { onClick: function () { return react_1.signOut(); }, className: 'text-white rounded-full bg-primary' }, "Logout "))),
            status == 'unauthenticated' && (React.createElement(React.Fragment, null,
                React.createElement(link_1["default"], { href: '/login' }, " Login "),
                React.createElement(link_1["default"], { href: '/register', className: "px-4 py-2 text-white rounded-full bg-primary" }, "  Register "))))));
}
exports["default"] = Header;
