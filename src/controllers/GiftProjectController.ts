import { Request, Response } from 'express';
import * as GiftProjectService from '../services/GiftProjectService';

export const createGiftProject = async (req: Request, res: Response) => {
  try {
    const project = await GiftProjectService.createGiftProject(req.body);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGiftProjects = async (req: Request, res: Response) => {
  try {
    const projects = await GiftProjectService.getGiftProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGiftProjectById = async (req: Request, res: Response) => {
  try {
    const project = await GiftProjectService.getGiftProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGiftProject = async (req: Request, res: Response) => {
  try {
    const project = await GiftProjectService.updateGiftProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGiftProject = async (req: Request, res: Response) => {
  try {
    const project = await GiftProjectService.deleteGiftProject(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};