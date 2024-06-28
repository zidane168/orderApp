'use client';
"use strict";
exports.__esModule = true;
var UseProfile_1 = require("@/components/UseProfile");
var Tabs_1 = require("@/components/layout/Tabs");
function MenuItemsPage() {
    var _a = UseProfile_1.useProfile(), loading = _a.loading, data = _a.data;
    if (loading) {
        return 'Loading user info ...';
    }
    if (!data.admin) {
        return 'Not an admin ...';
    }
    return (React.createElement("section", { className: "mt-8" },
        React.createElement(Tabs_1["default"], { isAdmin: true }),
        React.createElement("form", { className: "max-w-md mx-auto mt-8" },
            React.createElement("div", { className: "flex items-start gap-2" },
                React.createElement("div", null, "Image"),
                React.createElement("div", { className: "grow" },
                    React.createElement("label", null, " Menu item name "),
                    React.createElement("input", { type: "text" })),
                React.createElement("div", null,
                    React.createElement("button", { className: "mb-2", type: "submit" }, " Create"))))));
}
exports["default"] = MenuItemsPage;
