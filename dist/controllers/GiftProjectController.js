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
const GiftProjectService_1 = __importDefault(require("../services/GiftProjectService"));
const mongoose_1 = require("mongoose");
class GiftProjectController {
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, projectName, giftType, name, description, price, } = req.body;
                const files = req.files;
                const image = files['image'] ? files['image'][0].path : '';
                const templateImage = files['templateImage'] ? files['templateImage'][0].path : '';
                const newProject = yield GiftProjectService_1.default.createProject(new mongoose_1.Types.ObjectId(userId), projectName, giftType, name, description, price, templateImage, image);
                res.status(201).json({
                    code: 201,
                    message: 'Gift project created successfully',
                    success: true,
                    data: newProject,
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error creating gift project',
                    success: false,
                    data: [],
                });
            }
        });
    }
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const updateData = req.body;
                const files = req.files;
                if (files['image']) {
                    updateData.image = files['image'][0].path;
                }
                if (files['templateImage']) {
                    updateData.templateImage = files['templateImage'][0].path;
                }
                const updatedProject = yield GiftProjectService_1.default.updateProject(projectId, updateData);
                if (updatedProject) {
                    res.status(200).json({
                        code: 200,
                        message: 'Gift project updated successfully',
                        success: true,
                        data: updatedProject,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'Gift project not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error updating gift project',
                    success: false,
                    data: [],
                });
            }
        });
    }
    getProjectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const project = yield GiftProjectService_1.default.getProjectById(projectId);
                if (project) {
                    res.status(200).json({
                        code: 200,
                        message: 'Gift project retrieved successfully',
                        success: true,
                        data: project,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'Gift project not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error retrieving gift project',
                    success: false,
                    data: [],
                });
            }
        });
    }
    getProjectsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const projects = yield GiftProjectService_1.default.getProjectsByUser(userId);
                res.status(200).json({
                    code: 200,
                    message: 'Gift projects retrieved successfully',
                    success: true,
                    data: projects,
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error retrieving gift projects',
                    success: false,
                    data: [],
                });
            }
        });
    }
}
exports.default = new GiftProjectController();
//# sourceMappingURL=GiftProjectController.js.map