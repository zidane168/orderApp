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
var InfoBox_1 = require("@/components/layout/InfoBox");
var SuccessBox_1 = require("@/components/layout/SuccessBox");
var Tabs_1 = require("@/components/layout/Tabs");
var react_1 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var react_2 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
var EditableImage_1 = require("@/components/EditableImage");
function ProfilePage() {
    var _a, _b, _c, _d;
    var session = react_1.useSession();
    var userEmail = ((_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.email) || '';
    var userImage = ((_d = (_c = session.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.avatar) || '';
    var _e = react_2.useState(''), userName = _e[0], setUserName = _e[1];
    var _f = react_2.useState(false), saved = _f[0], setSaved = _f[1];
    var _g = react_2.useState(false), isSaving = _g[0], setIsSaving = _g[1];
    var status = session.status;
    var _h = react_2.useState(false), isAdmin = _h[0], setIsAdmin = _h[1];
    var _j = react_2.useState(), image = _j[0], setImage = _j[1];
    react_2.useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (status === 'authenticated') {
            setUserName((_b = (_a = session === null || session === void 0 ? void 0 : session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.name);
            setIsAdmin((_d = (_c = session === null || session === void 0 ? void 0 : session.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.is_admin);
            setImage((_f = (_e = session === null || session === void 0 ? void 0 : session.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.avatar);
            // call api here;
        }
    }, [session, status]);
    if (status === 'loading') {
        return 'Loading ...';
    }
    if (status === 'unauthenticated') {
        return navigation_1.redirect('/login');
    }
    function handleProfileInfoUpdate(e) {
        return __awaiter(this, void 0, void 0, function () {
            var savePromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        setSaved(false);
                        setIsSaving(true);
                        savePromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var response, ok;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fetch('api/profile', {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ name: userName })
                                        })];
                                    case 1:
                                        response = _a.sent();
                                        ok = response.ok;
                                        setIsSaving(false);
                                        if (ok) {
                                            setSaved(true);
                                            resolve();
                                        }
                                        else {
                                            reject();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, react_hot_toast_1["default"].promise(savePromise, {
                                loading: 'Saving ...',
                                success: 'Profile saved!',
                                error: 'Error'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // async function handleFileChange(e: React.FormEvent<HTMLFormElement>) {
    //     // toast( JSON.stringify(e?.target?.files) )
    //     const files = e?.target?.files;  
    //     if (files?.length > 0) {
    //         const formData = new FormData()
    //         formData.append('file', files[0])
    //        // toast( JSON.stringify(files[0]) )
    //         // toast('Uploading image:',  );
    //        toast('Uploading image:', formData.get('file'));
    //         await memberApi.uploadImage(formData).then((result) => {
    //             if (result.status == 200) { 
    //                // toast (JSON.stringify(result))
    //               //  toast("upload succeed")
    //             } else {
    //                // toast("upload failed")
    //             }
    //         })
    //     } 
    //     // console.log(e);
    //     // const files = e?.target?.files;
    //     // toast('Uploading ...')
    //     // if (files?.length > 0) {
    //     //     const data = new FormData
    //     //     data.set('file', files[0])
    //     //     await fetch('/api/upload', {
    //     //         method: 'POST',
    //     //         body: data,
    //     //         // headers: {'Content-Type': 'multipart/form-data'}
    //     //     })
    //     // } 
    // }
    return (React.createElement("section", { className: "my-8" },
        React.createElement(Tabs_1["default"], { isAdmin: isAdmin }),
        React.createElement("div", { className: 'max-w-lg p-4 mx-auto border' },
            saved && (React.createElement(SuccessBox_1["default"], null, " Profile saved ")),
            isSaving && (React.createElement(InfoBox_1["default"], null, " Saving ... ")),
            React.createElement("div", { className: "flex items-center gap-4 mt-2" },
                React.createElement("div", { className: "p-4 bg-gray-600 rounded-md" },
                    React.createElement(EditableImage_1["default"], { link: image, setLink: setImage })),
                React.createElement("form", { className: "grow", onSubmit: handleProfileInfoUpdate },
                    React.createElement("input", { type: "text", value: userName, onChange: function (e) { return setUserName(e.target.value); } }),
                    React.createElement("input", { type: "email", disabled: true, value: userEmail }),
                    React.createElement("button", { type: "submit" }, " Save "))))));
}
exports["default"] = ProfilePage;
