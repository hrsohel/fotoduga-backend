import CalendarProject, { ICalendarProject, ICalendarPage } from '../models/CalendarProject';
import { Types } from 'mongoose';

class CalendarProjectService {
  public async createProject(userId: Types.ObjectId, projectName: string, year: number, name: string, calendarType: string): Promise<ICalendarProject> {
    const initialPages: any[] = Array.from({ length: 12 }, (_, i) => ({
      monthIndex: i,
      bgType: 'plain',
      selectedBg: '#FFFFFF',
      layout: [],
      stickers: [],
      texts: [],
    }));

    const newProject = new CalendarProject({
      userId,
      projectName,
      year,
      name,
      calendarType,
      pages: initialPages,
    });
    await newProject.save();
    return newProject;
  }

  public async addOrUpdatePage(projectId: string, page: ICalendarPage): Promise<ICalendarProject | null> {
    const project = await CalendarProject.findById(projectId);
    if (!project) {
      return null;
    }

    const pageIndex = project.pages.findIndex(p => p.monthIndex === page.monthIndex);

    if (pageIndex > -1) {
      // Update existing page
      project.pages[pageIndex] = page;
      await project.save();
      return project;
    } else {
      // Page not found, and new pages cannot be added
      return null;
    }
  }

  public async getProjectPages(projectId: string): Promise<ICalendarPage[] | null> {
    const project = await CalendarProject.findById(projectId);
    return project ? project.pages : null;
  }
}

export default new CalendarProjectService();
