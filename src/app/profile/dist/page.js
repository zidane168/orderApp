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
var member_api_1 = require("../api/members/member.api");
var EditableImage_1 = require("@/components/EditableImage");
var navigation_2 = require("next/navigation");
var useSessionData_1 = require("@/customHook/useSessionData");
function ProfilePage() {
    var _this = this;
    var _a, _b;
    var session = react_1.useSession();
    var router = navigation_2.useRouter();
    var userEmail = ((_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.email) || '';
    var _c = react_2.useState(''), userName = _c[0], setUserName = _c[1];
    var _d = react_2.useState(false), saved = _d[0], setSaved = _d[1];
    var _e = react_2.useState(false), isSaving = _e[0], setIsSaving = _e[1];
    var status = session.status;
    var _f = react_2.useState(false), isAdmin = _f[0], setIsAdmin = _f[1];
    var _g = react_2.useState(), image = _g[0], setImage = _g[1];
    var _h = react_2.useState(''), avatarId = _h[0], setAvatarId = _h[1];
    react_2.useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var session_1, getProfile, res, userData, userName_1, isAdmin_1, avatar;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(status === 'authenticated')) return [3 /*break*/, 3];
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
                            session_1.user = userData;
                            userName_1 = (userData === null || userData === void 0 ? void 0 : userData.name) || (userData === null || userData === void 0 ? void 0 : userData.email);
                            isAdmin_1 = userData.is_admin;
                            avatar = userData.avatar;
                            setUserName(userName_1);
                            setIsAdmin(isAdmin_1);
                            setImage(avatar);
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
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
                            var update, res, error_1;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 5, , 6]);
                                        update = member_api_1.memberApi(session).update;
                                        res = null;
                                        if (!avatarId) return [3 /*break*/, 2];
                                        return [4 /*yield*/, update({
                                                name: userName,
                                                avatar_id: avatarId
                                            })];
                                    case 1:
                                        res = _c.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, update({
                                            name: userName
                                        })];
                                    case 3:
                                        res = _c.sent();
                                        _c.label = 4;
                                    case 4:
                                        setIsSaving(false);
                                        if ((res === null || res === void 0 ? void 0 : res.status) == 200 && ((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.status) === 200) {
                                            setSaved(true);
                                            session.data.user = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.params;
                                            resolve();
                                            return [2 /*return*/, router.push('/profile')]; // nothing happen
                                        }
                                        else {
                                            reject(new Error(res === null || res === void 0 ? void 0 : res.data));
                                        }
                                        return [3 /*break*/, 6];
                                    case 5:
                                        error_1 = _c.sent();
                                        reject(error_1);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
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
    return (React.createElement("section", { className: "my-8" },
        React.createElement(Tabs_1["default"], { isAdmin: isAdmin }),
        React.createElement("div", { className: 'max-w-lg p-4 mx-auto border' },
            saved && (React.createElement(SuccessBox_1["default"], null, " Profile saved ")),
            isSaving && (React.createElement(InfoBox_1["default"], null, " Saving ... ")),
            React.createElement("div", { className: "flex items-center gap-4 mt-2" },
                React.createElement("div", { className: "p-4 bg-gray-600 rounded-md" },
                    React.createElement(EditableImage_1["default"], { link: image, setLink: setImage, setAvatarId: setAvatarId, typeUpload: 1 })),
                React.createElement("form", { className: "grow", onSubmit: handleProfileInfoUpdate },
                    React.createElement("input", { type: "text", value: userName, onChange: function (e) { return setUserName(e.target.value); } }),
                    React.createElement("input", { type: "email", disabled: true, value: userEmail }),
                    React.createElement("button", { type: "submit" }, " Save "))))));
}
exports["default"] = ProfilePage;
