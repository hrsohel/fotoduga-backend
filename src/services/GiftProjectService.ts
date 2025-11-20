import GiftProject, { IGiftProject } from '../models/GiftProject';

export const createGiftProject = async (data: Partial<IGiftProject>): Promise<IGiftProject> => {
  const newProject = new GiftProject(data);
  return await newProject.save();
};

export const getGiftProjects = async (): Promise<IGiftProject[]> => {
  return await GiftProject.find();
};

export const getGiftProjectById = async (id: string): Promise<IGiftProject | null> => {
  return await GiftProject.findById(id);
};

export const updateGiftProject = async (id: string, data: Partial<IGiftProject>): Promise<IGiftProject | null> => {
  return await GiftProject.findByIdAndUpdate(id, data, { new: true });
};

export const deleteGiftProject = async (id: string): Promise<IGiftProject | null> => {
  return await GiftProject.findByIdAndDelete(id);
};