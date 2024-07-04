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
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
function EditableImage(_a) {
    var link = _a.link, setLink = _a.setLink;
    function handleFileChange(ev) {
        return __awaiter(this, void 0, void 0, function () {
            var files, data, uploadPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = ev.target.files;
                        if (!((files === null || files === void 0 ? void 0 : files.length) === 1)) return [3 /*break*/, 2];
                        data = new FormData;
                        data.set('file', files[0]);
                        uploadPromise = fetch('/api/upload', {
                            method: 'POST',
                            body: data
                        }).then(function (response) {
                            if (response.ok) {
                                return response.json().then(function (link) {
                                    setLink(link);
                                });
                            }
                            throw new Error('Something went wrong');
                        });
                        return [4 /*yield*/, react_hot_toast_1["default"].promise(uploadPromise, {
                                loading: 'Uploading ...',
                                success: 'Upload complete',
                                error: 'Upload failed'
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        link && (react_1["default"].createElement(Image, { className: "w-full h-full mb-1 rounded-lg", src: link, width: 250, height: 250, alt: 'avatar' })),
        !link && (react_1["default"].createElement("div", { className: "p-4 mb-1 text-center text-gray-500 bg-gray-200 rounded-lg" }, "No image")),
        react_1["default"].createElement("label", null,
            react_1["default"].createElement("input", { type: "file", className: "hidden", onChange: handleFileChange }),
            react_1["default"].createElement("span", { className: "block p-2 text-center border border-gray-300 rounded-lg cursor-pointer" }, " Edit "))));
}
exports["default"] = EditableImage;
