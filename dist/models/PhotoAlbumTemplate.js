"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhotoAlbumPageSchema = new mongoose_1.Schema({
    pageNumber: { type: Number, required: true },
    template: { type: String, required: true },
});
const PhotoAlbumTemplateSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String },
    pageType: { type: String },
    pages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "PhotoAlbumState" }],
});
exports.default = (0, mongoose_1.model)('PhotoAlbumTemplate', PhotoAlbumTemplateSchema);
//# sourceMappingURL=PhotoAlbumTemplate.js.map