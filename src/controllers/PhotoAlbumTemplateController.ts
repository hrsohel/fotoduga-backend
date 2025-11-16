import { Request, Response } from 'express';
import PhotoAlbumTemplateService from '../services/PhotoAlbumTemplateService';
import { Types } from 'mongoose';

class PhotoAlbumTemplateController {
  public async addTemplate(req: Request, res: Response): Promise<void> {
    try {
      const { name, category, pageType } = req.body;
      const newTemplate = await PhotoAlbumTemplateService.addTemplate(name, category, pageType);
      res.status(201).json({
        code: 201,
        message: 'Template added successfully',
        success: true,
        data: newTemplate,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error adding template',
        success: false,
        data: [],
      });
    }
  }

  public async updatePagesInTemplate(req: Request, res: Response): Promise<void> {
    try {
      const { templateName } = req.params;
      const { pagesToAdd, pagesToDelete } = req.body;
      const files = req.files as Express.Multer.File[];

      const updatedTemplate = await PhotoAlbumTemplateService.updatePagesInTemplate(
        templateName,
        pagesToAdd,
        files,
        pagesToDelete
      );

      if (updatedTemplate) {
        res.status(200).json({
          code: 200,
          message: 'Pages updated successfully',
          success: true,
          data: updatedTemplate,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Template not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error updating pages in template',
        success: false,
        data: [],
      });
    }
  }

  public async getTemplatePages(req: Request, res: Response): Promise<void> {
    try {
      const { templateName } = req.params;
      const template = await PhotoAlbumTemplateService.getTemplatePages(templateName);

      if (template) {
        res.status(200).json({
          code: 200,
          message: 'Template pages retrieved successfully',
          success: true,
          data: template.pages,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Template not found',
          success: false,
          data: [],
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Error retrieving template pages',
        success: false,
        data: [],
      });
    }
  }
}

export default new PhotoAlbumTemplateController();
