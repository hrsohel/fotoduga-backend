import PhotoAlbumState, { IPhotoAlbumState } from '../models/PhotoAlbumState';

export const createPhotoAlbumState = async (data: Partial<IPhotoAlbumState>): Promise<IPhotoAlbumState> => {
  const newState = new PhotoAlbumState(data);
  return await newState.save();
};

export const getPhotoAlbumStates = async (): Promise<IPhotoAlbumState[]> => {
  return await PhotoAlbumState.find();
};

export const getPhotoAlbumStateById = async (id: string): Promise<IPhotoAlbumState | null> => {
  return await PhotoAlbumState.findById(id);
};

export const updatePhotoAlbumState = async (id: string, data: Partial<IPhotoAlbumState>): Promise<IPhotoAlbumState | null> => {
  return await PhotoAlbumState.findByIdAndUpdate(id, data, { new: true });
};

export const deletePhotoAlbumState = async (id: string): Promise<IPhotoAlbumState | null> => {
  return await PhotoAlbumState.findByIdAndDelete(id);
};