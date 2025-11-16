"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Schema for text elements placed on images or the canvas
const TextSchema = new mongoose_1.Schema({
    text: { type: String, default: "Double click to edit" },
    x: { type: Number, default: 20 },
    y: { type: Number, default: 20 },
    fontSize: { type: Number, default: 20 },
    fontFamily: { type: String, default: "Arial" },
    fill: { type: String, default: "black" },
    width: { type: Number, default: 150 },
    height: { type: Number, default: 30 },
    scaleX: { type: Number, default: 1 },
    scaleY: { type: Number, default: 1 },
    rotation: { type: Number, default: 0 },
    draggable: { type: Boolean, default: true },
    align: { type: String, default: "left" },
    textDecoration: { type: String, default: "none" },
    id: { type: String, required: true } // Unique identifier for canvas texts
}, { _id: false });
// Schema for sticker elements placed on images or the canvas
const StickerSchema = new mongoose_1.Schema({
    sticker: { type: String, required: true },
    x: { type: Number, default: 20 },
    y: { type: Number, default: 20 },
    width: { type: Number, default: 50 },
    height: { type: Number, default: 50 },
    scaleX: { type: Number, default: 1 },
    scaleY: { type: Number, default: 1 },
    rotation: { type: Number, default: 0 },
    draggable: { type: Boolean, default: true },
    id: { type: String, required: true } // Unique identifier for canvas stickers
}, { _id: false });
// Schema for images placed within grid cells
const PlacedImageSchema = new mongoose_1.Schema({
    src: { type: String, required: true },
    scaleX: { type: Number, default: 1 },
    scaleY: { type: Number, default: 1 },
    rotation: { type: Number, default: 0 },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    id: { type: Number, required: true },
    shape: { type: String, enum: ["rect", "line"], required: true },
    partition: { type: String, enum: ["left", "right", "debug"], required: true },
    gridArea: { type: String },
    mask: { type: String, default: null },
    frameUrl: { type: String, default: null }
}, { _id: false });
// Schema for the individual grid cells/positions
const GridPositionSchema = new mongoose_1.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    id: { type: Number, required: true },
    shape: { type: String, enum: ["rect", "line"], required: true },
    partition: { type: String, enum: ["left", "right", "debug"], required: true },
    gridArea: { type: String },
    mask: { type: String, default: null },
    frameUrl: { type: String, default: null }
}, { _id: false });
// Main schema for the entire photo album project state
const PhotoAlbumStateSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: String, required: true, unique: true },
    placedImages: [PlacedImageSchema],
    gridCount: {
        left: { type: Number, default: 5 },
        right: { type: Number, default: 5 }
    },
    gridPositions: [GridPositionSchema],
    layoutModelLeft: { type: Number, default: 0 },
    layoutModelRight: { type: Number, default: 0 },
    bgType: { type: String, default: "plain" },
    selectBg: { type: String, default: "#D81B60" },
    leftBg: { type: String, default: null },
    rightBg: { type: String, default: null },
    leftBgType: { type: String, default: "plain" },
    rightBgType: { type: String, default: "plain" },
    canvasStickers: [StickerSchema],
    canvasTexts: [TextSchema],
    // The following fields are UI state and might not be necessary to save in the DB
    // but are included for completeness based on the 'newState' object.
    selectedPhotoLayout: { type: mongoose_1.Schema.Types.Mixed },
    selectedImageIndex: { type: Number, default: null },
    selectedElement: {
        type: { type: String, default: null },
        imageIndex: { type: Number, default: null },
        elementIndex: { type: Number, default: null }
    },
    selectedPartition: { type: String, default: "left" },
    activeLeftBar: { type: String, default: "Frames" }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});
const PhotoAlbumState = mongoose_1.default.model('PhotoAlbumState', PhotoAlbumStateSchema);
exports.default = PhotoAlbumState;
//# sourceMappingURL=PhotoAlbumState.js.map