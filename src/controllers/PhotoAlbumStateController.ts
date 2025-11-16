import { Request, Response } from 'express';
import PhotoAlbumStateService from '../services/PhotoAlbumStateService';

class PhotoAlbumStateController {
  public async createState(req: Request, res: Response): Promise<void> {
    try {
      const stateData = req.body;
      const files = req.files as Express.Multer.File[];
      const newState = await PhotoAlbumStateService.createState(stateData, files);
      res.status(201).json({
        code: 201,
        message: 'Photo album state created successfully',
        success: true,
        data: newState,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error creating photo album state',
        success: false,
        data: [],
      });
    }
  }
}

export default new PhotoAlbumStateController();
