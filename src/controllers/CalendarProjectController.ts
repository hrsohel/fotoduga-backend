import { Request, Response } from 'express';
import CalendarProjectService from '../services/CalendarProjectService';
import { Types } from 'mongoose';

class CalendarProjectController {
  public async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { userId, projectName, year, name, calendarType } = req.body;
      const newProject = await CalendarProjectService.createProject(new Types.ObjectId(userId), projectName, year, name, calendarType);
      res.status(201).json({
        code: 201,
        message: 'Project created successfully',
        success: true,
        data: newProject,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error creating project',
        success: false,
        data: [],
      });
    }
  }

  public async addOrUpdatePage(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const page = req.body;
      const updatedProject = await CalendarProjectService.addOrUpdatePage(projectId, page);
      if (updatedProject) {
        res.status(200).json({
          code: 200,
          message: 'Page updated successfully',
          success: true,
          data: updatedProject,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Project or page not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error updating page',
        success: false,
        data: [],
      });
    }
  }

  public async getProjectPages(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const pages = await CalendarProjectService.getProjectPages(projectId);
      if (pages) {
        res.status(200).json({
          code: 200,
          message: 'Pages retrieved successfully',
          success: true,
          data: pages,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Project not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error retrieving pages',
        success: false,
        data: [],
      });
    }
  }
}

export default new CalendarProjectController();
