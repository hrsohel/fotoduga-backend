import express, { Application, Request, Response } from 'express';
import photoAlbumTemplateRoutes from './routes/PhotoAlbumTemplateRoutes';
import calendarProjectRoutes from './routes/CalendarProjectRoutes';
import giftProjectRoutes from './routes/GiftProjectRoutes';
import photoAlbumStateRoutes from './routes/PhotoAlbumStateRoutes';
import userImagesRoutes from './routes/UserImagesRoutes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/uploads', express.static('uploads'));
    }

    private routes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello, World!');
        });
        this.app.use('/api', photoAlbumTemplateRoutes);
        this.app.use('/api/calendars', calendarProjectRoutes);
        this.app.use('/api/gifts', giftProjectRoutes);
        this.app.use('/api/photo-album', photoAlbumStateRoutes);
        this.app.use('/api', userImagesRoutes);
    }
}

export default new App().app;
