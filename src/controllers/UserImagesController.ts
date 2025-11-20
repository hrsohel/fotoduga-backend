import { Request, Response } from 'express';
import * as UserImagesService from '../services/UserImagesService';
import { Types } from 'mongoose';

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const files = req.files as Express.Multer.File[];
    const imagePaths = files.map(file => file.path.replace(/\\/g, '/'));

    const updatedUserImages = await UserImagesService.uploadImages(
      new Types.ObjectId(userId),
      imagePaths
    );

    res.status(200).json(updatedUserImages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const { imageUrl } = req.body;

    const updatedUserImages = await UserImagesService.deleteImage(
      new Types.ObjectId(userId),
      imageUrl
    );

    if (updatedUserImages) {
      res.status(200).json(updatedUserImages);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getImagesByUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const images = await UserImagesService.getImagesByUser(
      new Types.ObjectId(userId)
    );
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(404).json({ message: 'User not found or no images' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};