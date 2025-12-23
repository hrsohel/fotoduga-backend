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
exports.getImagesByUser = exports.deleteImage = exports.uploadImages = void 0;
const Images_1 = __importDefault(require("../models/Images"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadImages = (userId, imagePaths) => __awaiter(void 0, void 0, void 0, function* () {
    return Images_1.default.findOneAndUpdate({ userId }, { $push: { images: { $each: imagePaths } } }, { new: true, upsert: true });
});
exports.uploadImages = uploadImages;
const deleteImage = (userId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const imageFullPath = path_1.default.join(process.cwd(), imageUrl);
    try {
        yield fs_1.default.promises.unlink(imageFullPath);
        console.log(`Deleted file: ${imageFullPath}`);
    }
    catch (error) {
        console.error(`Error deleting file ${imageFullPath}:`, error);
    }
    return Images_1.default.findOneAndUpdate({ userId }, { $pull: { images: imageUrl } }, { new: true });
});
exports.deleteImage = deleteImage;
const getImagesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userImages = yield Images_1.default.findOne({ userId });
    if (userImages && userImages.images) {
        return userImages.images.map(imagePath => imagePath.replace(/\\/g, '/'));
    }
    return null;
});
exports.getImagesByUser = getImagesByUser;
//# sourceMappingURL=UserImagesService.js.map