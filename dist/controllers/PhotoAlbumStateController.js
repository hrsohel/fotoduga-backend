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
const PhotoAlbumStateService_1 = __importDefault(require("../services/PhotoAlbumStateService"));
class PhotoAlbumStateController {
    createState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stateData = req.body;
                const files = req.files;
                const newState = yield PhotoAlbumStateService_1.default.createState(stateData, files);
                res.status(201).json({
                    code: 201,
                    message: 'Photo album state created successfully',
                    success: true,
                    data: newState,
                });
            }
            catch (error) {
                res.status(500).json({
                    code: 500,
                    message: 'Error creating photo album state',
                    success: false,
                    data: [],
                });
            }
        });
    }
}
exports.default = new PhotoAlbumStateController();
//# sourceMappingURL=PhotoAlbumStateController.js.map