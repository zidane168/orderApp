"use strict";
exports.__esModule = true;
exports.MenuItem = void 0;
var mongoose_1 = require("mongoose");
var MenuItemSchema = new mongoose_1.Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number }
}, { timestamps: true });
exports.MenuItem = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.MenuItem) || model('MenuItem', MenuItemSchema);
