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
const PhotoAlbumState_1 = __importDefault(require("../models/PhotoAlbumState"));
class PhotoAlbumStateService {
    createState(stateData, files) {
        return __awaiter(this, void 0, void 0, function* () {
            if (files && files.length > 0) {
                let fileIndex = 0;
                if (stateData.placedImages) {
                    for (let i = 0; i < stateData.placedImages.length; i++) {
                        if (fileIndex < files.length) {
                            stateData.placedImages[i].src = files[fileIndex].path;
                            fileIndex++;
                        }
                    }
                }
            }
            const newState = new PhotoAlbumState_1.default(stateData);
            yield newState.save();
            return newState;
        });
    }
}
exports.default = new PhotoAlbumStateService();
//# sourceMappingURL=PhotoAlbumStateService.js.map