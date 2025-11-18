"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserImagesController_1 = __importDefault(require("../controllers/UserImagesController"));
const upload_1 = __importDefault(require("../middleware/upload"));
console.log('UserImagesRoutes.ts loaded');
const router = (0, express_1.Router)();
router.post('/users/:userId/images', upload_1.default.array('images'), UserImagesController_1.default.uploadImages);
router.delete('/users/:userId/images', UserImagesController_1.default.deleteImage);
router.get('/users/:userId/images', UserImagesController_1.default.getImagesByUser);
exports.default = router;
//# sourceMappingURL=UserImagesRoutes.js.map