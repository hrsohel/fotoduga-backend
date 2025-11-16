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
const UserImagesService_1 = __importDefault(require("../services/UserImagesService"));
const mongoose_1 = require("mongoose");
class UserImagesController {
    uploadImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const files = req.files;
                const imagePaths = files.map(file => file.path);
                const updatedUserImages = yield UserImagesService_1.default.uploadImages(new mongoose_1.Types.ObjectId(userId), imagePaths);
                res.status(200).json({
                    code: 200,
                    message: 'Images uploaded successfully',
                    success: true,
                    data: updatedUserImages,
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error uploading images',
                    success: false,
                    data: [],
                });
            }
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { imageUrl } = req.body;
                const updatedUserImages = yield UserImagesService_1.default.deleteImage(new mongoose_1.Types.ObjectId(userId), imageUrl);
                if (updatedUserImages) {
                    res.status(200).json({
                        code: 200,
                        message: 'Image deleted successfully',
                        success: true,
                        data: updatedUserImages,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'User not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error deleting image',
                    success: false,
                    data: [],
                });
            }
        });
    }
    getImagesByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const images = yield UserImagesService_1.default.getImagesByUser(new mongoose_1.Types.ObjectId(userId));
                if (images) {
                    res.status(200).json({
                        code: 200,
                        message: 'Images retrieved successfully',
                        success: true,
                        data: images,
                    });
                }
                else {
                    res.status(404).json({
                        code: 404,
                        message: 'User not found',
                        success: false,
                        data: [],
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error retrieving images',
                    success: false,
                    data: [],
                });
            }
        });
    }
}
exports.default = new UserImagesController();
//# sourceMappingURL=UserImagesController.js.map