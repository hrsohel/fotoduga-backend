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
const Images_1 = __importDefault(require("../models/Images"));
const fs_1 = __importDefault(require("fs")); // Import fs module
const path_1 = __importDefault(require("path")); // Import path module
class UserImagesService {
    uploadImages(userId, imagePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            return Images_1.default.findOneAndUpdate({ userId }, { $push: { images: { $each: imagePaths } } }, { new: true, upsert: true });
        });
    }
    deleteImage(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construct the full path to the image file
            const imageFullPath = path_1.default.join(process.cwd(), imageUrl); // Assuming imageUrl is like 'uploads/image.png'
            try {
                // Delete the file from the file system
                yield fs_1.default.promises.unlink(imageFullPath);
                console.log(`Deleted file: ${imageFullPath}`);
            }
            catch (error) {
                console.error(`Error deleting file ${imageFullPath}:`, error);
                // Depending on requirements, you might want to throw the error or continue
                // For now, we'll just log and proceed to remove from DB
            }
            // Remove the image URL from the database
            return Images_1.default.findOneAndUpdate({ userId }, { $pull: { images: imageUrl } }, { new: true });
        });
    }
    getImagesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userImages = yield Images_1.default.findOne({ userId });
            if (userImages && userImages.images) {
                // Sanitize paths: replace backslashes with forward slashes
                return userImages.images.map(imagePath => imagePath.replace(/\\/g, '/'));
            }
            return null;
        });
    }
}
exports.default = new UserImagesService();
//# sourceMappingURL=UserImagesService.js.map