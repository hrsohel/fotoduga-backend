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
exports.deleteCalendarProject = exports.updateCalendarProject = exports.getCalendarProjectById = exports.getCalendarProjects = exports.createCalendarProject = void 0;
const CalendarProject_1 = __importDefault(require("../models/CalendarProject"));
const createCalendarProject = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = new CalendarProject_1.default(data);
    return yield newProject.save();
});
exports.createCalendarProject = createCalendarProject;
const getCalendarProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield CalendarProject_1.default.find();
});
exports.getCalendarProjects = getCalendarProjects;
const getCalendarProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CalendarProject_1.default.findById(id);
});
exports.getCalendarProjectById = getCalendarProjectById;
const updateCalendarProject = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CalendarProject_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateCalendarProject = updateCalendarProject;
const deleteCalendarProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CalendarProject_1.default.findByIdAndDelete(id);
});
exports.deleteCalendarProject = deleteCalendarProject;
//# sourceMappingURL=CalendarProjectService.js.map