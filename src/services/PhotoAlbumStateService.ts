import PhotoAlbumState, { IPhotoAlbumState } from '../models/PhotoAlbumState';
import { Types } from 'mongoose';

class PhotoAlbumStateService {
  public async createState(
    stateData: Partial<IPhotoAlbumState>,
    files: Express.Multer.File[]
  ): Promise<IPhotoAlbumState> {
    if (files && files.length > 0) {
      let fileIndex = 0;
      if (stateData.placedImages) {
        for (let i = 0; i < stateData.placedImages.length; i++) {
          if (fileIndex < files.length) {
            stateData.placedImages[i].src = files[fileIndex].path;
            fileIndex++;
          }
        }
      }
    }

    const newState = new PhotoAlbumState(stateData);
    await newState.save();
    return newState;
  }
}

export default new PhotoAlbumStateService();
