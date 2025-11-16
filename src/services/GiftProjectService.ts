import GiftProject, { IGiftProject } from '../models/GiftProject';
import { Types } from 'mongoose';

class GiftProjectService {
  public async createProject(
    userId: Types.ObjectId,
    projectName: string,
    giftType: 'T-shirt' | 'Cup' | 'Card' | 'MousePad',
    name: string,
    description: string,
    price: number,
    templateImage: string,
    image: string
  ): Promise<IGiftProject> {
    const newProject = new GiftProject({
      userId,
      projectName,
      giftType,
      name,
      description,
      price,
      templateImage,
      image,
    });
    await newProject.save();
    return newProject;
  }

  public async updateProject(
    projectId: string,
    updateData: Partial<IGiftProject>
  ): Promise<IGiftProject | null> {
    return GiftProject.findByIdAndUpdate(projectId, updateData, { new: true });
  }

  public async getProjectById(projectId: string): Promise<IGiftProject | null> {
    return GiftProject.findById(projectId);
  }

  public async getProjectsByUser(userId: string): Promise<IGiftProject[]> {
    return GiftProject.find({ userId: new Types.ObjectId(userId) });
  }
}

export default new GiftProjectService();
