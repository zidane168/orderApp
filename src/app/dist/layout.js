"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var google_1 = require("next/font/google");
require("./globals.css");
var moment_1 = require("moment");
var Header_1 = require("@/components/layout/Header");
var AppContext_1 = require("@/components/AppContext");
var react_hot_toast_1 = require("react-hot-toast");
var roboto = google_1.Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });
require('dotenv').config();
exports.metadata = {
    title: "Order app",
    description: "By ViLH"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: roboto.className },
            React.createElement("main", { className: "max-w-4xl p-4 mx-auto" },
                React.createElement(AppContext_1.AppProvider, null,
                    React.createElement(react_hot_toast_1.Toaster, null),
                    React.createElement(Header_1["default"], null),
                    children,
                    React.createElement("footer", { className: "p-8 mt-16 text-center border-t" },
                        "\u00A9 ",
                        moment_1["default"]().year(),
                        " All right reserved"))))));
}
exports["default"] = RootLayout;
