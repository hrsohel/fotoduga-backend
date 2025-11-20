import CalendarProject, { ICalendarProject } from '../models/CalendarProject';

export const createCalendarProject = async (data: Partial<ICalendarProject>): Promise<ICalendarProject> => {
  const newProject = new CalendarProject(data);
  return await newProject.save();
};

export const getCalendarProjects = async (): Promise<ICalendarProject[]> => {
  return await CalendarProject.find();
};

export const getCalendarProjectById = async (id: string): Promise<ICalendarProject | null> => {
  return await CalendarProject.findById(id);
};

export const updateCalendarProject = async (id: string, data: Partial<ICalendarProject>): Promise<ICalendarProject | null> => {
  return await CalendarProject.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCalendarProject = async (id: string): Promise<ICalendarProject | null> => {
  return await CalendarProject.findByIdAndDelete(id);
};