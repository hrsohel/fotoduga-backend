"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PhotoAlbumTemplateController_1 = __importDefault(require("../controllers/PhotoAlbumTemplateController"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
router.post('/templates', PhotoAlbumTemplateController_1.default.addTemplate);
router.patch('/templates/:templateName/pages', upload_1.default.array('placedImages'), PhotoAlbumTemplateController_1.default.updatePagesInTemplate);
router.get('/templates/:templateName/pages', PhotoAlbumTemplateController_1.default.getTemplatePages);
exports.default = router;
//# sourceMappingURL=PhotoAlbumTemplateRoutes.js.map