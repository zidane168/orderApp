'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("next-auth/react");
var link_1 = require("next/link");
function Header() {
    var _a;
    var session = react_1.useSession();
    var status = session.status;
    var userData = (_a = session === null || session === void 0 ? void 0 : session.data) === null || _a === void 0 ? void 0 : _a.user;
    var userName = (userData === null || userData === void 0 ? void 0 : userData.name) || (userData === null || userData === void 0 ? void 0 : userData.email);
    var firstName = "";
    if (userName && userName.includes('')) {
        firstName = userName.split(' ')[0];
    }
    return (React.createElement("header", { className: "flex items-center justify-between" },
        React.createElement("nav", { className: "flex items-center gap-8 font-semibold text-gray-500" },
            React.createElement(link_1["default"], { className: "text-2xl font-semibold text-primary", href: '/' }, " ST PIZZA "),
            React.createElement(link_1["default"], { href: '/' }, " Home "),
            React.createElement(link_1["default"], { href: '' }, " Menu "),
            React.createElement(link_1["default"], { href: '' }, " About "),
            React.createElement(link_1["default"], { href: '' }, " Contact ")),
        React.createElement("nav", { className: "flex items-center gap-4 font-semibold text-gray-500" },
            status == 'authenticated' && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'w-[150px]' },
                    React.createElement(link_1["default"], { href: '/profile' },
                        " Hello, ",
                        firstName,
                        " ")),
                React.createElement("button", { onClick: function () { return react_1.signOut(); }, className: 'text-white rounded-full bg-primary' }, "Logout "))),
            status == 'unauthenticated' && (React.createElement(React.Fragment, null,
                React.createElement(link_1["default"], { href: '/login' }, " Login "),
                React.createElement(link_1["default"], { href: '/register', className: "px-4 py-2 text-white rounded-full bg-primary" }, "  Register "))))));
}
exports["default"] = Header;
