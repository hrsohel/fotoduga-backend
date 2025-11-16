"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PhotoAlbumStateController_1 = __importDefault(require("../controllers/PhotoAlbumStateController"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
router.post('/states', upload_1.default.array('placedImages'), PhotoAlbumStateController_1.default.createState);
exports.default = router;
//# sourceMappingURL=PhotoAlbumStateRoutes.js.map