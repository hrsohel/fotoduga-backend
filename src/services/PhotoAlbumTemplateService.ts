import PhotoAlbumTemplate, { IPhotoAlbumTemplate } from '../models/PhotoAlbumTemplate';
import PhotoAlbumState, { IPhotoAlbumState } from '../models/PhotoAlbumState';
import { Types } from 'mongoose';

class PhotoAlbumTemplateService {
  public async addTemplate(name: string, category: string, pageType: string): Promise<IPhotoAlbumTemplate> {
    const template = await PhotoAlbumTemplate.findOneAndUpdate(
      { name },
      { $setOnInsert: { name, category, pageType, pages: [] } },
      { new: true, upsert: true }
    );
    return template;
  }

  public async updatePagesInTemplate(
    templateName: string,
    pagesToAdd: IPhotoAlbumState[],
    files: Express.Multer.File[],
    pagesToDelete: string[]
  ): Promise<IPhotoAlbumTemplate | null> {
    const newPageIds: Types.ObjectId[] = [];

    if (pagesToAdd && pagesToAdd.length > 0) {
      let fileIndex = 0;
      for (const pageData of pagesToAdd) {
        if (pageData.placedImages) {
          for (let i = 0; i < pageData.placedImages.length; i++) {
            if (fileIndex < files.length) {
              pageData.placedImages[i].src = files[fileIndex].path;
              fileIndex++;
            }
          }
        }
        const newPage = new PhotoAlbumState(pageData);
        await newPage.save();
        newPageIds.push(newPage._id as any);
      }
    }

    const update: any = {};
    if (newPageIds.length > 0) {
      update.$addToSet = { pages: { $each: newPageIds } };
    }
    if (pagesToDelete && pagesToDelete.length > 0) {
      update.$pull = { pages: { $in: pagesToDelete.map(id => new Types.ObjectId(id)) } };
    }

    return PhotoAlbumTemplate.findOneAndUpdate(
      { name: templateName },
      update,
      { new: true }
    );
  }

  public async getTemplatePages(templateName: string): Promise<IPhotoAlbumTemplate | null> {
    return PhotoAlbumTemplate.findOne({ name: templateName }).populate('pages');
  }
}

export default new PhotoAlbumTemplateService();
