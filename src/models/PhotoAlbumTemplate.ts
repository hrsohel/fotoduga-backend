import { Document, Schema, model } from 'mongoose';

export interface IPhotoAlbumPage extends Document {
  pageNumber: number;
  template: string; // e.g., 'template1', 'template2'
}

export interface IPhotoAlbumTemplate extends Document {
  name: string;
  pages: IPhotoAlbumPage[];
}

const PhotoAlbumPageSchema = new Schema({
  pageNumber: { type: Number, required: true },
  template: { type: String, required: true },
});

const PhotoAlbumTemplateSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: {type: String},
  pageType: {type: String},
  pages: [{type: Schema.Types.ObjectId, ref: "PhotoAlbumState"}],
});

export default model<IPhotoAlbumTemplate>('PhotoAlbumTemplate', PhotoAlbumTemplateSchema);
