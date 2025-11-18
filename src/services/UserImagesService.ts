import UserImages, { IImage } from '../models/Images';
import { Types } from 'mongoose';
import fs from 'fs'; // Import fs module
import path from 'path'; // Import path module

class UserImagesService {
  public async uploadImages(
    userId: Types.ObjectId,
    imagePaths: string[]
  ): Promise<IImage | null> {
    return UserImages.findOneAndUpdate(
      { userId },
      { $push: { images: { $each: imagePaths } } },
      { new: true, upsert: true }
    );
  }

  public async deleteImage(
    userId: Types.ObjectId,
    imageUrl: string
  ): Promise<IImage | null> {
    // Construct the full path to the image file
    const imageFullPath = path.join(process.cwd(), imageUrl); // Assuming imageUrl is like 'uploads/image.png'

    try {
      // Delete the file from the file system
      await fs.promises.unlink(imageFullPath);
      console.log(`Deleted file: ${imageFullPath}`);
    } catch (error) {
      console.error(`Error deleting file ${imageFullPath}:`, error);
      // Depending on requirements, you might want to throw the error or continue
      // For now, we'll just log and proceed to remove from DB
    }

    // Remove the image URL from the database
    return UserImages.findOneAndUpdate(
      { userId },
      { $pull: { images: imageUrl } },
      { new: true }
    );
  }

  public async getImagesByUser(userId: Types.ObjectId): Promise<string[] | null> {
    const userImages = await UserImages.findOne({ userId });
    if (userImages && userImages.images) {
      // Sanitize paths: replace backslashes with forward slashes
      return userImages.images.map(imagePath => imagePath.replace(/\\/g, '/'));
    }
    return null;
  }
}

export default new UserImagesService();
