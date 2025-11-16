import { Request, Response } from 'express';
import GiftProjectService from '../services/GiftProjectService';
import { Types } from 'mongoose';

class GiftProjectController {
  public async createProject(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        projectName,
        giftType,
        name,
        description,
        price,
      } = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const image = files['image'] ? files['image'][0].path : '';
      const templateImage = files['templateImage'] ? files['templateImage'][0].path : '';

      const newProject = await GiftProjectService.createProject(
        new Types.ObjectId(userId),
        projectName,
        giftType,
        name,
        description,
        price,
        templateImage,
        image
      );
      res.status(201).json({
        code: 201,
        message: 'Gift project created successfully',
        success: true,
        data: newProject,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error creating gift project',
        success: false,
        data: [],
      });
    }
  }

  public async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const updateData = req.body;

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files['image']) {
        updateData.image = files['image'][0].path;
      }
      if (files['templateImage']) {
        updateData.templateImage = files['templateImage'][0].path;
      }

      const updatedProject = await GiftProjectService.updateProject(
        projectId,
        updateData
      );
      if (updatedProject) {
        res.status(200).json({
          code: 200,
          message: 'Gift project updated successfully',
          success: true,
          data: updatedProject,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Gift project not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error updating gift project',
        success: false,
        data: [],
      });
    }
  }

  public async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const project = await GiftProjectService.getProjectById(projectId);
      if (project) {
        res.status(200).json({
          code: 200,
          message: 'Gift project retrieved successfully',
          success: true,
          data: project,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Gift project not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error retrieving gift project',
        success: false,
        data: [],
      });
    }
  }

  public async getProjectsByUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const projects = await GiftProjectService.getProjectsByUser(userId);
      res.status(200).json({
        code: 200,
        message: 'Gift projects retrieved successfully',
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error retrieving gift projects',
        success: false,
        data: [],
      });
    }
  }
}

export default new GiftProjectController();
