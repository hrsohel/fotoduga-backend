"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GiftProjectController_1 = __importDefault(require("../controllers/GiftProjectController"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = (0, express_1.Router)();
router.post('/projects', upload_1.default.fields([
    { name: 'image', maxCount: 1 },
    { name: 'templateImage', maxCount: 1 },
]), GiftProjectController_1.default.createProject);
router.put('/projects/:projectId', upload_1.default.fields([
    { name: 'image', maxCount: 1 },
    { name: 'templateImage', maxCount: 1 },
]), GiftProjectController_1.default.updateProject);
router.get('/projects/:projectId', GiftProjectController_1.default.getProjectById);
router.get('/users/:userId/projects', GiftProjectController_1.default.getProjectsByUser);
exports.default = router;
//# sourceMappingURL=GiftProjectRoutes.js.map