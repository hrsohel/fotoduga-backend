import { Request, Response } from 'express';
import * as PhotoAlbumStateService from '../services/PhotoAlbumStateService';

export const createPhotoAlbumState = async (req: Request, res: Response) => {
  try {
    const state = await PhotoAlbumStateService.createPhotoAlbumState(req.body);
    res.status(201).json(state);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPhotoAlbumStates = async (req: Request, res: Response) => {
  try {
    const states = await PhotoAlbumStateService.getPhotoAlbumStates();
    res.status(200).json(states);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPhotoAlbumStateById = async (req: Request, res: Response) => {
  try {
    const state = await PhotoAlbumStateService.getPhotoAlbumStateById(req.params.id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.status(200).json(state);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePhotoAlbumState = async (req: Request, res: Response) => {
  try {
    const state = await PhotoAlbumStateService.updatePhotoAlbumState(req.params.id, req.body);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.status(200).json(state);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePhotoAlbumState = async (req: Request, res: Response) => {
  try {
    const state = await PhotoAlbumStateService.deletePhotoAlbumState(req.params.id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};