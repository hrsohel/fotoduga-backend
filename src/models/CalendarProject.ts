import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces for the sub-documents
interface ICalendarText extends Document {
  id: string;
  text: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  rotation: number;
  align: string;
  textDecoration: string;
}

interface ICalendarSticker extends Document {
  id: string;
  text: string; // The emoji/sticker character
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize: number; // Stickers are often larger
  rotation: number;
}

interface ICalendarGridLayout extends Document {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image?: string; // URL for the cell's background image
  frameUrl?: string; // URL for an overlay frame
}

export interface ICalendarPage extends Document {
  monthIndex: number;
  bgType: 'plain' | 'image';
  selectedBg: string;
  layout: ICalendarGridLayout[];
  stickers: ICalendarSticker[];
  texts: ICalendarText[];
}

// Define interface for the main document
export interface ICalendarProject extends Document {
  name: string
  calendarType: string
  userId: mongoose.Types.ObjectId;
  projectName: string;
  year: number;
  pages: ICalendarPage[]; // An array of 12 pages, one for each month
  createdAt: Date;
  updatedAt: Date;
}

// Sub-schema for text elements on the calendar page
const CalendarTextSchema = new Schema<ICalendarText>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number },
  height: { type: Number },
  fontSize: { type: Number, default: 20 },
  fontFamily: { type: String, default: 'Arial' },
  fill: { type: String, default: 'black' },
  rotation: { type: Number, default: 0 },
  align: { type: String, default: 'left' },
  textDecoration: { type: String, default: 'none' }
}, { _id: false });

// Sub-schema for sticker elements (emojis/images) on the calendar page
// Note: The component uses a "DraggableText" for stickers, so the structure is similar.
const CalendarStickerSchema = new Schema<ICalendarSticker>({
  id: { type: String, required: true },
  text: { type: String, required: true }, // The emoji/sticker character
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number },
  height: { type: Number },
  fontSize: { type: Number, default: 50 }, // Stickers are often larger
  rotation: { type: Number, default: 0 }
}, { _id: false });

// Sub-schema for the grid cells that can contain images and frames
const CalendarGridLayoutSchema = new Schema<ICalendarGridLayout>({
  id: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  image: { type: String, default: null }, // URL for the cell's background image
  frameUrl: { type: String, default: null } // URL for an overlay frame
}, { _id: false });

// Schema for the state of a single calendar page (one month)
const CalendarPageSchema = new Schema<ICalendarPage>({
  monthIndex: { type: Number, required: true, min: 0, max: 11 },
  bgType: { type: String, enum: ['plain', 'image'], default: 'plain' },
  selectedBg: { type: String, default: '#FFFFFF' },
  layout: [CalendarGridLayoutSchema],
  stickers: [CalendarStickerSchema],
  texts: [CalendarTextSchema]
}, { _id: false });

// Main schema for a complete calendar project
const CalendarProjectSchema = new Schema<ICalendarProject>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: {type: String, default: null},
  calendarType: {type: String, default: null},
  projectName: { type: String, required: true },
  year: { type: Number, required: true },
  pages: [CalendarPageSchema] // An array of 12 pages, one for each month
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const CalendarProject = mongoose.model<ICalendarProject>('CalendarProject', CalendarProjectSchema);

export default CalendarProject;
