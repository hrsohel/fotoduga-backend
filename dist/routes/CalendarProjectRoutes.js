"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarProjectController_1 = __importDefault(require("../controllers/CalendarProjectController"));
const router = (0, express_1.Router)();
router.post('/projects', CalendarProjectController_1.default.createProject);
router.post('/projects/:projectId/pages', CalendarProjectController_1.default.addOrUpdatePage);
router.get('/projects/:projectId/pages', CalendarProjectController_1.default.getProjectPages);
exports.default = router;
//# sourceMappingURL=CalendarProjectRoutes.js.map