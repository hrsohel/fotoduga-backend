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
exports.deletePhotoAlbumState = exports.updatePhotoAlbumState = exports.getPhotoAlbumStateById = exports.getPhotoAlbumStates = exports.createPhotoAlbumState = void 0;
const PhotoAlbumState_1 = __importDefault(require("../models/PhotoAlbumState"));
const createPhotoAlbumState = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newState = new PhotoAlbumState_1.default(data);
    return yield newState.save();
});
exports.createPhotoAlbumState = createPhotoAlbumState;
const getPhotoAlbumStates = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield PhotoAlbumState_1.default.find();
});
exports.getPhotoAlbumStates = getPhotoAlbumStates;
const getPhotoAlbumStateById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PhotoAlbumState_1.default.findById(id);
});
exports.getPhotoAlbumStateById = getPhotoAlbumStateById;
const updatePhotoAlbumState = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PhotoAlbumState_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updatePhotoAlbumState = updatePhotoAlbumState;
const deletePhotoAlbumState = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PhotoAlbumState_1.default.findByIdAndDelete(id);
});
exports.deletePhotoAlbumState = deletePhotoAlbumState;
//# sourceMappingURL=PhotoAlbumStateService.js.map