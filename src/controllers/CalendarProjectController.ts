import { Request, Response } from 'express';
import * as CalendarProjectService from '../services/CalendarProjectService';

export const createCalendarProject = async (req: Request, res: Response) => {
  try {
    const project = await CalendarProjectService.createCalendarProject(req.body);
    res.status(201).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCalendarProjects = async (req: Request, res: Response) => {
  try {
    const projects = await CalendarProjectService.getCalendarProjects();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCalendarProjectById = async (req: Request, res: Response) => {
  try {
    const project = await CalendarProjectService.getCalendarProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCalendarProject = async (req: Request, res: Response) => {
  try {
    const project = await CalendarProjectService.updateCalendarProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCalendarProject = async (req: Request, res: Response) => {
  try {
    const project = await CalendarProjectService.deleteCalendarProject(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};