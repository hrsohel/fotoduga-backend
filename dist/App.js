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
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(// CORS applied here, before static files
        (0, cors_1.default)({
            origin: (origin, callback) => {
                // Allow requests with no origin (Postman, cURL, mobile apps)
                if (!origin)
                    return callback(null, true);
                const allowedOrigins = [
                    'http://localhost:3000',
                    'http://localhost:5173',
                    'http://127.0.0.1:5173',
                    'https://trader-ada-refused-seem.trycloudflare.com', // your tunnel
                    // add your real domain later
                ];
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true, // This is the key line
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        this.app.use(express_1.default.json()); // Global JSON body parser
        this.app.use(express_1.default.urlencoded({ extended: true })); // Global URL-encoded body parser
        this.app.use('/uploads', express_1.default.static('uploads')); // Static files after CORS
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello, World!');
        });
        this.app.use('/api', UserImagesRoutes_1.default);
        this.app.use('/api', PhotoAlbumTemplateRoutes_1.default);
        this.app.use('/api/calendars', CalendarProjectRoutes_1.default);
        this.app.use('/api/gifts', GiftProjectRoutes_1.default);
        this.app.use('/api/photo-album', PhotoAlbumStateRoutes_1.default);
    }
}
exports.default = new App().app;
//# sourceMappingURL=App.js.map