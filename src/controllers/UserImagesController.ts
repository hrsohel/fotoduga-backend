import { Request, Response } from 'express';
import UserImagesService from '../services/UserImagesService';
import { Types } from 'mongoose';

class UserImagesController {
  public async uploadImages(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const files = req.files as Express.Multer.File[];
      const imagePaths = files.map(file => file.path.replace(/\\/g, '/'));

      const updatedUserImages = await UserImagesService.uploadImages(
        new Types.ObjectId(userId),
        imagePaths
      );

      res.status(200).json({
        code: 200,
        message: 'Images uploaded successfully',
        success: true,
        data: updatedUserImages,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error uploading images',
        success: false,
        data: [],
      });
    }
  }

  public async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { imageUrl } = req.body;

      const updatedUserImages = await UserImagesService.deleteImage(
        new Types.ObjectId(userId),
        imageUrl
      );

      if (updatedUserImages) {
        res.status(200).json({
          code: 200,
          message: 'Image deleted successfully',
          success: true,
          data: updatedUserImages,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'User not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({
        code: 500,
        message: 'Error deleting image',
        success: false,
        data: [],
      });
    }
  }

  public async getImagesByUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("user images")
      const { userId } = req.params;
      console.log(userId)
      const images = await UserImagesService.getImagesByUser(
        new Types.ObjectId(userId)
      );
      if (images) {
        res.status(200).json({
          code: 200,
          message: 'Images retrieved successfully',
          success: true,
          data: images,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'User not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error retrieving images',
        success: false,
        data: [],
      });
    }
  }
}

export default new UserImagesController();
