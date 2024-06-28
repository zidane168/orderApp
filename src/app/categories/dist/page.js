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
var UseProfile_1 = require("@/components/UseProfile");
var Tabs_1 = require("@/components/layout/Tabs");
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
function Categories() {
    var _a = UseProfile_1.useProfile(), profileLoading = _a.loading, profileData = _a.data; // tra
    var _b = react_1.useState(''), newCategoryName = _b[0], setNewCategoryName = _b[1];
    if (profileLoading) {
        return "Loading user info ...";
    }
    if (!profileData.admin) {
        return 'Not an admin';
    }
    function handleNewCategorySubmit(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var creationPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ev.preventDefault();
                        creationPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch('/api/categories', {
                                            body: JSON.stringify({ name: newCategoryName }),
                                            method: 'POST',
                                            headers: { 'content-type': 'application/json' }
                                        })];
                                    case 1:
                                        response = _a.sent();
                                        if (response.ok)
                                            resolve();
                                        else
                                            reject();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, react_hot_toast_1["default"].promise(creationPromise, {
                                loading: 'Creating your new category ...',
                                error: 'Error created,',
                                success: 'Category created'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("section", { className: "max-w-lg mx-auto mt-8" },
        React.createElement(Tabs_1["default"], { isAdmin: true }),
        React.createElement("form", { className: "mt-8", onSubmit: handleNewCategorySubmit },
            React.createElement("div", { className: "flex items-end gap-2" },
                React.createElement("div", { className: "grow" },
                    React.createElement("label", null, "New Category Name "),
                    React.createElement("input", { type: "text", value: newCategoryName, onChange: function (ev) { return setNewCategoryName(ev.target.value); } })),
                React.createElement("div", { className: "pb-2" },
                    React.createElement("button", { type: "submit" }, " Create "))))));
}
exports["default"] = Categories;
