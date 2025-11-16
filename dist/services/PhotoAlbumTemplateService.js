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
const PhotoAlbumTemplate_1 = __importDefault(require("../models/PhotoAlbumTemplate"));
const PhotoAlbumState_1 = __importDefault(require("../models/PhotoAlbumState"));
const mongoose_1 = require("mongoose");
class PhotoAlbumTemplateService {
    addTemplate(name, category, pageType) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = yield PhotoAlbumTemplate_1.default.findOneAndUpdate({ name }, { $setOnInsert: { name, category, pageType, pages: [] } }, { new: true, upsert: true });
            return template;
        });
    }
    updatePagesInTemplate(templateName, pagesToAdd, files, pagesToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPageIds = [];
            if (pagesToAdd && pagesToAdd.length > 0) {
                let fileIndex = 0;
                for (const pageData of pagesToAdd) {
                    if (pageData.placedImages) {
                        for (let i = 0; i < pageData.placedImages.length; i++) {
                            if (fileIndex < files.length) {
                                pageData.placedImages[i].src = files[fileIndex].path;
                                fileIndex++;
                            }
                        }
                    }
                    const newPage = new PhotoAlbumState_1.default(pageData);
                    yield newPage.save();
                    newPageIds.push(newPage._id);
                }
            }
            const update = {};
            if (newPageIds.length > 0) {
                update.$addToSet = { pages: { $each: newPageIds } };
            }
            if (pagesToDelete && pagesToDelete.length > 0) {
                update.$pull = { pages: { $in: pagesToDelete.map(id => new mongoose_1.Types.ObjectId(id)) } };
            }
            return PhotoAlbumTemplate_1.default.findOneAndUpdate({ name: templateName }, update, { new: true });
        });
    }
    getTemplatePages(templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            return PhotoAlbumTemplate_1.default.findOne({ name: templateName }).populate('pages');
        });
    }
}
exports.default = new PhotoAlbumTemplateService();
//# sourceMappingURL=PhotoAlbumTemplateService.js.map