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
// Sub-schema for text elements on the calendar page
const CalendarTextSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
    fontSize: { type: Number, default: 20 },
    fontFamily: { type: String, default: 'Arial' },
    fill: { type: String, default: 'black' },
    rotation: { type: Number, default: 0 },
    align: { type: String, default: 'left' },
    textDecoration: { type: String, default: 'none' }
}, { _id: false });
// Sub-schema for sticker elements (emojis/images) on the calendar page
// Note: The component uses a "DraggableText" for stickers, so the structure is similar.
const CalendarStickerSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true }, // The emoji/sticker character
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
    fontSize: { type: Number, default: 50 }, // Stickers are often larger
    rotation: { type: Number, default: 0 }
}, { _id: false });
// Sub-schema for the grid cells that can contain images and frames
const CalendarGridLayoutSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    image: { type: String, default: null }, // URL for the cell's background image
    frameUrl: { type: String, default: null } // URL for an overlay frame
}, { _id: false });
// Schema for the state of a single calendar page (one month)
const CalendarPageSchema = new mongoose_1.Schema({
    monthIndex: { type: Number, required: true, min: 0, max: 11 },
    bgType: { type: String, enum: ['plain', 'image'], default: 'plain' },
    selectedBg: { type: String, default: '#FFFFFF' },
    layout: [CalendarGridLayoutSchema],
    stickers: [CalendarStickerSchema],
    texts: [CalendarTextSchema]
}, { _id: false });
// Main schema for a complete calendar project
const CalendarProjectSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: null },
    calendarType: { type: String, default: null },
    projectName: { type: String, required: true },
    year: { type: Number, required: true },
    pages: [CalendarPageSchema] // An array of 12 pages, one for each month
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});
const CalendarProject = mongoose_1.default.model('CalendarProject', CalendarProjectSchema);
exports.default = CalendarProject;
//# sourceMappingURL=CalendarProject.js.map