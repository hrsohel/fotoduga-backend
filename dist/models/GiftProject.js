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
exports.GiftType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// An enum to define the supported gift types, making the data more predictable
const GiftType = Object.freeze({
    TSHIRT: 'T-shirt',
    CUP: 'Cup',
    CARD: 'Card',
    MOUSE_PAD: 'MousePad'
    // Add other gift types here as they are created
});
exports.GiftType = GiftType;
// Main schema for a customizable gift project
const GiftProjectSchema = new mongoose_1.Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: null },
    templateImage: { type: String },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    giftType: {
        type: String,
        enum: Object.values(GiftType),
        required: true
    },
    // customization: {
    //   // The primary user-provided image, stored as a Base64 string.
    //   image: {
    //     type: String,
    //     default: null
    //   }
    //   // You could extend this object with more properties later,
    //   // e.g., text overlays, colors, etc.
    //   // text: { type: String },
    //   // font: { type: String },
    //   // color: { type: String },
    //   // position: { x: Number, y: Number }
    // }
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});
// To improve query performance, especially when fetching gifts for a user or by type
GiftProjectSchema.index({ userId: 1, giftType: 1 });
const GiftProject = mongoose_1.default.model('GiftProject', GiftProjectSchema);
exports.default = GiftProject;
//# sourceMappingURL=GiftProject.js.map