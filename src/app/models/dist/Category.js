"use strict";
exports.__esModule = true;
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true }
}, { timestamps: true });
exports.Category = (module === null || module === void 0 ? void 0 : module.Category) || mongoose_1.model('Category', CategorySchema);
