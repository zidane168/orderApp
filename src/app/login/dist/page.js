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
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_2 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
function LoginPage() {
    var _a = react_2.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_2.useState(''), password = _b[0], setPassword = _b[1];
    var _c = react_2.useState(false), loginInProgress = _c[0], setLoginInProgress = _c[1];
    function handleFormSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                e.preventDefault();
                setLoginInProgress(true);
                react_1.signIn('credentials', { email: email, password: password, callbackUrl: '/' }).then(function (result) {
                    if (!result.error) { // use Session and this result from api/auth/[...nextauth]
                        react_hot_toast_1["default"]('Login successfully!');
                        console.log(' --------- ');
                        console.log(result.data);
                        console.log(' --------- ');
                        return;
                    }
                    else {
                        var rel = JSON.parse(result.error);
                        react_hot_toast_1["default"](rel.message);
                    }
                });
                setLoginInProgress(false);
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("section", null,
        React.createElement("h1", { className: "mt-6 text-4xl text-center text-primary" }, " Login "),
        React.createElement("form", { className: "block max-w-xs mx-auto", onSubmit: handleFormSubmit },
            React.createElement("input", { type: "email", disabled: loginInProgress, name: "email", placeholder: "Input email here", value: email, onChange: function (e) { return setEmail(e.target.value); } }),
            React.createElement("input", { disabled: loginInProgress, name: "password", type: "password", placeholder: "Input your password here", value: password, onChange: function (e) { return setPassword(e.target.value); } }),
            React.createElement("button", { disabled: loginInProgress, type: "submit" }, "Login"),
            React.createElement("div", { className: "my-4 text-center text-gray-400" }, "Or login with provide"),
            React.createElement("button", { className: "flex items-center justify-center gap-4 loginWithGoogle", onClick: function () { return react_1.signIn('google', { callbackUrl: '/' }); }, type: "button" },
                React.createElement(image_1["default"], { width: '32', height: '32', src: '/google.png', objectFit: 'contain', alt: 'google icon' }),
                "Login with google"),
            React.createElement("div", { className: "my-6 text-center text-gray-500 border-t text" },
                "Don't have account? ",
                React.createElement(link_1["default"], { className: "underline", href: '/register' }, " Register ")))));
}
exports["default"] = LoginPage;
