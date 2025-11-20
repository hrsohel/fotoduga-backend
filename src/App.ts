import express, { Application, Request, Response } from 'express';
import photoAlbumTemplateRoutes from './routes/PhotoAlbumTemplateRoutes';
import calendarProjectRoutes from './routes/CalendarProjectRoutes';
import giftProjectRoutes from './routes/GiftProjectRoutes';
import photoAlbumStateRoutes from './routes/PhotoAlbumStateRoutes';
import userImagesRoutes from './routes/UserImagesRoutes';
import userRoutes from './routes/UserRoutes';
import cors from "cors"
import upload from './middleware/upload';

class App {
    public app: Application;


    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use( // CORS applied here, before static files
            cors({
                origin: (origin, callback) => {
                    // Allow requests with no origin (Postman, cURL, mobile apps)
                    if (!origin) return callback(null, true);

                    const allowedOrigins = [
                        'http://localhost:3000',
                        'http://localhost:5173',
                        'http://127.0.0.1:5173',
                        'https://trader-ada-refused-seem.trycloudflare.com', // your tunnel
                        // add your real domain later
                    ];

                    if (allowedOrigins.includes(origin) || !origin) {
                        callback(null, true);
                    } else {
                        callback(new Error('Not allowed by CORS'));
                    }
                },
                credentials: true,        // This is the key line
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            })
        );
        this.app.use(express.json()); // Global JSON body parser
        this.app.use(express.urlencoded({ extended: true })); // Global URL-encoded body parser
        this.app.use('/uploads', express.static('uploads')); // Static files after CORS
    }

    private routes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello, World!');
        });
        this.app.use('/api', userImagesRoutes);
        this.app.use('/api', photoAlbumTemplateRoutes);
        this.app.use('/api', calendarProjectRoutes);
        this.app.use('/api', giftProjectRoutes);
        this.app.use('/api', photoAlbumStateRoutes);
        this.app.use('/api/users', userRoutes);
    }
}

export default new App().app;
