"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PhotoAlbumTemplateRoutes_1 = __importDefault(require("./routes/PhotoAlbumTemplateRoutes"));
const CalendarProjectRoutes_1 = __importDefault(require("./routes/CalendarProjectRoutes"));
const GiftProjectRoutes_1 = __importDefault(require("./routes/GiftProjectRoutes"));
const PhotoAlbumStateRoutes_1 = __importDefault(require("./routes/PhotoAlbumStateRoutes"));
const UserImagesRoutes_1 = __importDefault(require("./routes/UserImagesRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/uploads', express_1.default.static('uploads'));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello, World!');
        });
        this.app.use('/api', PhotoAlbumTemplateRoutes_1.default);
        this.app.use('/api/calendars', CalendarProjectRoutes_1.default);
        this.app.use('/api/gifts', GiftProjectRoutes_1.default);
        this.app.use('/api/photo-album', PhotoAlbumStateRoutes_1.default);
        this.app.use('/api', UserImagesRoutes_1.default);
    }
}
exports.default = new App().app;
//# sourceMappingURL=App.js.map