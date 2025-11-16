"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CalendarProjectService_1 = __importDefault(require("../services/CalendarProjectService"));
const mongoose_1 = require("mongoose");
class CalendarProjectController {
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, projectName, year, name, calendarType } = req.body;
                const newProject = yield CalendarProjectService_1.default.createProject(new mongoose_1.Types.ObjectId(userId), projectName, year, name, calendarType);
                res.status(201).json({
                    code: 201,
                    message: 'Project created successfully',
                    success: true,
                    data: newProject,
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error creating project',
                    success: false,
                    data: [],
                });
            }
        });
    }
    addOrUpdatePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const page = req.body;
                const updatedProject = yield CalendarProjectService_1.default.addOrUpdatePage(projectId, page);
                if (updatedProject) {
                    res.status(200).json({
                        code: 200,
                        message: 'Page updated successfully',
                        success: true,
                        data: updatedProject,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'Project or page not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error updating page',
                    success: false,
                    data: [],
                });
            }
        });
    }
    getProjectPages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const pages = yield CalendarProjectService_1.default.getProjectPages(projectId);
                if (pages) {
                    res.status(200).json({
                        code: 200,
                        message: 'Pages retrieved successfully',
                        success: true,
                        data: pages,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'Project not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error retrieving pages',
                    success: false,
                    data: [],
                });
            }
        });
    }
}
exports.default = new CalendarProjectController();
//# sourceMappingURL=CalendarProjectController.js.map