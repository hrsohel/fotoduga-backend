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
const CalendarProject_1 = __importDefault(require("../models/CalendarProject"));
class CalendarProjectService {
    createProject(userId, projectName, year, name, calendarType) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialPages = Array.from({ length: 12 }, (_, i) => ({
                monthIndex: i,
                bgType: 'plain',
                selectedBg: '#FFFFFF',
                layout: [],
                stickers: [],
                texts: [],
            }));
            const newProject = new CalendarProject_1.default({
                userId,
                projectName,
                year,
                name,
                calendarType,
                pages: initialPages,
            });
            yield newProject.save();
            return newProject;
        });
    }
    addOrUpdatePage(projectId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield CalendarProject_1.default.findById(projectId);
            if (!project) {
                return null;
            }
            const pageIndex = project.pages.findIndex(p => p.monthIndex === page.monthIndex);
            if (pageIndex > -1) {
                // Update existing page
                project.pages[pageIndex] = page;
                yield project.save();
                return project;
            }
            else {
                // Page not found, and new pages cannot be added
                return null;
            }
        });
    }
    getProjectPages(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield CalendarProject_1.default.findById(projectId);
            return project ? project.pages : null;
        });
    }
}
exports.default = new CalendarProjectService();
//# sourceMappingURL=CalendarProjectService.js.map