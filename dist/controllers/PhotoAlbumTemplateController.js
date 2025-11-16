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
const PhotoAlbumTemplateService_1 = __importDefault(require("../services/PhotoAlbumTemplateService"));
class PhotoAlbumTemplateController {
    addTemplate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, category, pageType } = req.body;
                const newTemplate = yield PhotoAlbumTemplateService_1.default.addTemplate(name, category, pageType);
                res.status(201).json({
                    code: 201,
                    message: 'Template added successfully',
                    success: true,
                    data: newTemplate,
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error adding template',
                    success: false,
                    data: [],
                });
            }
        });
    }
    updatePagesInTemplate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { templateName } = req.params;
                const { pagesToAdd, pagesToDelete } = req.body;
                const files = req.files;
                const updatedTemplate = yield PhotoAlbumTemplateService_1.default.updatePagesInTemplate(templateName, pagesToAdd, files, pagesToDelete);
                if (updatedTemplate) {
                    res.status(200).json({
                        code: 200,
                        message: 'Pages updated successfully',
                        success: true,
                        data: updatedTemplate,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'Template not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error updating pages in template',
                    success: false,
                    data: [],
                });
            }
        });
    }
    getTemplatePages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { templateName } = req.params;
                const template = yield PhotoAlbumTemplateService_1.default.getTemplatePages(templateName);
                if (template) {
                    res.status(200).json({
                        code: 200,
                        message: 'Template pages retrieved successfully',
                        success: true,
                        data: template.pages,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'Template not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error retrieving template pages',
                    success: false,
                    data: [],
                });
            }
        });
    }
}
exports.default = new PhotoAlbumTemplateController();
//# sourceMappingURL=PhotoAlbumTemplateController.js.map