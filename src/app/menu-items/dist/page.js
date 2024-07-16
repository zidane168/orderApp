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
var EditableImage_1 = require("@/components/EditableImage");
var UseProfile_1 = require("@/components/UseProfile");
var Tabs_1 = require("@/components/layout/Tabs");
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var product_api_1 = require("../api/product/product.api");
var Combobox_1 = require("@/components/Combobox");
var category_api_1 = require("../api/categories/category.api");
var react_2 = require("@nextui-org/react");
var MenuItemPriceProps_1 = require("@/components/layout/MenuItemPriceProps");
var AppQuillTextEditor_1 = require("@/components/AppQuillTextEditor");
function MenuItemsPage() {
    var _a = UseProfile_1.useProfile(), loading = _a.loading, data = _a.data;
    var _b = react_1.useState(), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), description = _c[0], setDescription = _c[1];
    var _d = react_1.useState(), basePrice = _d[0], setBasePrice = _d[1];
    var _e = react_1.useState(''), image = _e[0], setImage = _e[1];
    var _f = react_1.useState(''), imageId = _f[0], setImageId = _f[1];
    var _g = react_1.useState([]), sizes = _g[0], setSizes = _g[1];
    var _h = react_1.useState([]), extras = _h[0], setExtras = _h[1];
    var _j = react_1.useState(), category = _j[0], setCategories = _j[1];
    var _k = react_1.useState({ id: 0, name: '-- Please Select --' }), selectedItem = _k[0], setSelectedItem = _k[1];
    function handleEditorChange(content) {
        setDescription(content);
    }
    react_1.useEffect(function () {
        fetchCategories();
    }, []);
    function fetchCategories() {
        return __awaiter(this, void 0, void 0, function () {
            var getAll, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getAll = category_api_1.categoryApi().getAll;
                        return [4 /*yield*/, getAll()];
                    case 1:
                        res = _a.sent();
                        if (res.data.status === 200) {
                            setCategories(res.data.params);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleSubmit(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var create, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ev.preventDefault();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        create = product_api_1.productApi().create;
                        return [4 /*yield*/, create({
                                name: name,
                                description: description,
                                base_price: basePrice,
                                category_id: selectedItem.id,
                                image_id: imageId,
                                product_sizes: sizes,
                                product_extras: extras
                            })];
                    case 2:
                        response = _a.sent();
                        if (!(response.data.status == 200)) return [3 /*break*/, 4];
                        return [4 /*yield*/, react_hot_toast_1["default"].promise(Promise.resolve(), {
                                success: 'Data is saved',
                                loading: 'Saving'
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, react_hot_toast_1["default"].promise(Promise.reject(response.data.message), {
                            error: response.data.message
                        })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    if (loading) {
        return 'Loading user info ...';
    }
    if (!data.is_admin) {
        return 'Not an admin ...';
    }
    return (React.createElement("section", { className: "mt-8" },
        React.createElement(Tabs_1["default"], { isAdmin: true }),
        React.createElement("form", { className: "max-w-md mx-auto mt-8", onSubmit: handleSubmit },
            React.createElement("div", { className: "grid items-start gap-4" },
                React.createElement("div", { className: "grid items-start gap-4", style: { gridTemplateColumns: '.3fr, .7fr' } },
                    React.createElement("div", null,
                        React.createElement(EditableImage_1["default"], { link: image, setLink: setImage, setAvatarId: setImageId, typeUpload: 2 }))),
                React.createElement(Combobox_1["default"], { name: 'Category', list: category, setSelectedItem: setSelectedItem }),
                React.createElement("div", { className: "grow" },
                    React.createElement("label", null, " Item name "),
                    React.createElement("input", { type: "text", value: name, onChange: function (ev) { return setName(ev.target.value); } }),
                    React.createElement("label", null, " Description "),
                    React.createElement(AppQuillTextEditor_1["default"], { onChange: handleEditorChange, value: description || '' }),
                    React.createElement("label", null, " Base price "),
                    React.createElement("input", { type: "number", className: "form-control", value: basePrice, onChange: function (ev) { return setBasePrice(ev.target.value); } })),
                React.createElement(MenuItemPriceProps_1["default"], { props: sizes, setProps: setSizes, labelText: 'Sizes', buttonText: 'Add new sizes' }),
                React.createElement(MenuItemPriceProps_1["default"], { props: extras, setProps: setExtras, labelText: 'Extras Ingredients', buttonText: 'Add new extras' }),
                React.createElement("div", null,
                    React.createElement(react_2.Button, { type: "submit" }, " Save "))))));
}
exports["default"] = MenuItemsPage;
