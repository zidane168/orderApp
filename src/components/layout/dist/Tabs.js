"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var log_1 = require("../../ultis/log");
function UserTabs(_a) {
    var isAdmin = _a.isAdmin;
    var path = navigation_1.usePathname();
    log_1["default"]({ 'content': path });
    console.log("env2: ", process.env.GOOGLE_CLIENT_ID);
    return (React.createElement("div", { className: "flex justify-center gap-2 mx-auto mb-4 tabs" },
        React.createElement(link_1["default"], { className: path === '/profile' ? 'active' : '', href: '/profile' }, " Profile "),
        isAdmin && (React.createElement(React.Fragment, null,
            React.createElement(link_1["default"], { className: path === '/categories' ? 'active' : '', href: '/categories' }, " Categories "),
            React.createElement(link_1["default"], { className: path === '/menu-items' ? 'active' : '', href: '/menu-items' }, " Menu Items "),
            React.createElement(link_1["default"], { className: path === '/users' ? 'active' : '', href: '/users' }, " Users ")))));
}
exports["default"] = UserTabs;
function userPathname() {
    throw new Error("Function not implemented.");
}
