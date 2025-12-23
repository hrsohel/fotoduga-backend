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
exports.deleteGiftProject = exports.updateGiftProject = exports.getGiftProjectById = exports.getGiftProjects = exports.createGiftProject = void 0;
const GiftProject_1 = __importDefault(require("../models/GiftProject"));
const createGiftProject = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = new GiftProject_1.default(data);
    return yield newProject.save();
});
exports.createGiftProject = createGiftProject;
const getGiftProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield GiftProject_1.default.find();
});
exports.getGiftProjects = getGiftProjects;
const getGiftProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield GiftProject_1.default.findById(id);
});
exports.getGiftProjectById = getGiftProjectById;
const updateGiftProject = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield GiftProject_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateGiftProject = updateGiftProject;
const deleteGiftProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield GiftProject_1.default.findByIdAndDelete(id);
});
exports.deleteGiftProject = deleteGiftProject;
//# sourceMappingURL=GiftProjectService.js.map