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
const GiftProject_1 = __importDefault(require("../models/GiftProject"));
const mongoose_1 = require("mongoose");
class GiftProjectService {
    createProject(userId, projectName, giftType, name, description, price, templateImage, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = new GiftProject_1.default({
                userId,
                projectName,
                giftType,
                name,
                description,
                price,
                templateImage,
                image,
            });
            yield newProject.save();
            return newProject;
        });
    }
    updateProject(projectId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return GiftProject_1.default.findByIdAndUpdate(projectId, updateData, { new: true });
        });
    }
    getProjectById(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return GiftProject_1.default.findById(projectId);
        });
    }
    getProjectsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return GiftProject_1.default.find({ userId: new mongoose_1.Types.ObjectId(userId) });
        });
    }
}
exports.default = new GiftProjectService();
//# sourceMappingURL=GiftProjectService.js.map