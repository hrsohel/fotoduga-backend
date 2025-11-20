import UserImages, { IImage } from '../models/Images';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';

export const uploadImages = async (userId: Types.ObjectId, imagePaths: string[]): Promise<IImage | null> => {
  return UserImages.findOneAndUpdate(
    { userId },
    { $push: { images: { $each: imagePaths } } },
    { new: true, upsert: true }
  );
};

export const deleteImage = async (userId: Types.ObjectId, imageUrl: string): Promise<IImage | null> => {
  const imageFullPath = path.join(process.cwd(), imageUrl);

  try {
    await fs.promises.unlink(imageFullPath);
    console.log(`Deleted file: ${imageFullPath}`);
  } catch (error) {
    console.error(`Error deleting file ${imageFullPath}:`, error);
  }

  return UserImages.findOneAndUpdate(
    { userId },
    { $pull: { images: imageUrl } },
    { new: true }
  );
};

export const getImagesByUser = async (userId: Types.ObjectId): Promise<string[] | null> => {
  const userImages = await UserImages.findOne({ userId });
  if (userImages && userImages.images) {
    return userImages.images.map(imagePath => imagePath.replace(/\\/g, '/'));
  }
  return null;
};