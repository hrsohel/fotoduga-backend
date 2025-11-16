import UserImages, { IImage } from '../models/Images';
import { Types } from 'mongoose';

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
    return UserImages.findOneAndUpdate(
      { userId },
      { $pull: { images: imageUrl } },
      { new: true }
    );
  }

  public async getImagesByUser(userId: Types.ObjectId): Promise<string[] | null> {
    const userImages = await UserImages.findOne({ userId });
    return userImages ? userImages.images : null;
  }
}

export default new UserImagesService();
