import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces for the sub-documents
interface IText extends Document {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  draggable: boolean;
  align: string;
  textDecoration: string;
  id: string;
}

interface ISticker extends Document {
  sticker: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  draggable: boolean;
  id: string;
}

interface IPlacedImage extends Document {
  src: string;
  scaleX: number;
  scaleY: number;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
  shape: "rect" | "line";
  partition: "left" | "right" | "debug";
  gridArea?: string;
  mask?: string;
  frameUrl?: string;
  texts: IText[];
  stickers: ISticker[];
}

interface IGridPosition extends Document {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
  shape: "rect" | "line";
  partition: "left" | "right" | "debug";
  gridArea?: string;
  mask?: string;
  frameUrl?: string;
}

// Define interface for the main document
export interface IPhotoAlbumState extends Document {
  userId: mongoose.Types.ObjectId;
  projectId: string;
  placedImages: IPlacedImage[];
  gridCount: {
    left: number;
    right: number;
  };
  gridPositions: IGridPosition[];
  layoutModelLeft: number;
  layoutModelRight: number;
  bgType: string;
  selectedBg: string;
  leftBg: string | null;
  rightBg: string | null;
  leftBgType: string;
  rightBgType: string;
  canvasStickers: ISticker[];
  canvasTexts: IText[];
  selectedPhotoLayout?: any; // Using 'any' for mixed type, can be refined
  selectedImageIndex?: number | null;
  selectedElement?: {
    type: string | null;
    imageIndex: number | null;
    elementIndex: number | null;
  };
  selectedPartition: "left" | "right";
  activeLeftBar: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for text elements placed on images or the canvas
const TextSchema = new Schema<IText>({
  text: { type: String, default: "Double click to edit" },
  x: { type: Number, default: 20 },
  y: { type: Number, default: 20 },
  fontSize: { type: Number, default: 20 },
  fontFamily: { type: String, default: "Arial" },
  fill: { type: String, default: "black" },
  width: { type: Number, default: 150 },
  height: { type: Number, default: 30 },
  scaleX: { type: Number, default: 1 },
  scaleY: { type: Number, default: 1 },
  rotation: { type: Number, default: 0 },
  draggable: { type: Boolean, default: true },
  align: { type: String, default: "left" },
  textDecoration: { type: String, default: "none" },
  id: { type: String, required: true } // Unique identifier for canvas texts
}, { _id: false });

// Schema for sticker elements placed on images or the canvas
const StickerSchema = new Schema<ISticker>({
  sticker: { type: String, required: true },
  x: { type: Number, default: 20 },
  y: { type: Number, default: 20 },
  width: { type: Number, default: 50 },
  height: { type: Number, default: 50 },
  scaleX: { type: Number, default: 1 },
  scaleY: { type: Number, default: 1 },
  rotation: { type: Number, default: 0 },
  draggable: { type: Boolean, default: true },
  id: { type: String, required: true } // Unique identifier for canvas stickers
}, { _id: false });

// Schema for images placed within grid cells
const PlacedImageSchema = new Schema<IPlacedImage>({
  src: { type: String, required: true },
  scaleX: { type: Number, default: 1 },
  scaleY: { type: Number, default: 1 },
  rotation: { type: Number, default: 0 },
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  id: { type: Number, required: true },
  shape: { type: String, enum: ["rect", "line"], required: true },
  partition: { type: String, enum: ["left", "right", "debug"], required: true },
  gridArea: { type: String },
  mask: { type: String, default: null },
  frameUrl: { type: String, default: null },
  texts: [TextSchema],
  stickers: [StickerSchema]
}, { _id: false });

// Schema for the individual grid cells/positions
const GridPositionSchema = new Schema<IGridPosition>({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  id: { type: Number, required: true },
  shape: { type: String, enum: ["rect", "line"], required: true },
  partition: { type: String, enum: ["left", "right", "debug"], required: true },
  gridArea: { type: String },
  mask: { type: String, default: null },
  frameUrl: { type: String, default: null }
}, { _id: false });

// Main schema for the entire photo album project state
const PhotoAlbumStateSchema = new Schema<IPhotoAlbumState>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  projectId: { type: String, unique: true },
  placedImages: [PlacedImageSchema],
  gridCount: {
    left: { type: Number, default: 5 },
    right: { type: Number, default: 5 }
  },
  gridPositions: [GridPositionSchema],
  layoutModelLeft: { type: Number, default: 0 },
  layoutModelRight: { type: Number, default: 0 },
  bgType: { type: String, default: "plain" },
  selectedBg: { type: String, default: "#D81B60" },
  leftBg: { type: String, default: null },
  rightBg: { type: String, default: null },
  leftBgType: { type: String, default: "plain" },
  rightBgType: { type: String, default: "plain" },
  canvasStickers: [StickerSchema],
  canvasTexts: [TextSchema],
  // The following fields are UI state and might not be necessary to save in the DB
  // but are included for completeness based on the 'newState' object.
  selectedPhotoLayout: { type: Schema.Types.Mixed },
  selectedImageIndex: { type: Number, default: null },
  selectedElement: {
    type: { type: String, default: null },
    imageIndex: { type: Number, default: null },
    elementIndex: { type: Number, default: null }
  },
  selectedPartition: { type: String, default: "left" },
  activeLeftBar: { type: String, default: "Frames" }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const PhotoAlbumState = mongoose.model<IPhotoAlbumState>('PhotoAlbumState', PhotoAlbumStateSchema);

export default PhotoAlbumState;
