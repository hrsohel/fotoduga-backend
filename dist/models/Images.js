"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", default: null },
    images: [{ type: String }]
});
const UserImages = (0, mongoose_1.model)("UserImages", ImageSchema);
exports.default = UserImages;
//# sourceMappingURL=Images.js.map