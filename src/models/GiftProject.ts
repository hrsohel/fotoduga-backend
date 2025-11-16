import mongoose, { Document, Schema } from 'mongoose';

// An enum to define the supported gift types, making the data more predictable
const GiftType = Object.freeze({
  TSHIRT: 'T-shirt',
  CUP: 'Cup',
  CARD: 'Card',
  MOUSE_PAD: 'MousePad'
  // Add other gift types here as they are created
});

// Define interface for the customization sub-document
interface ICustomization {
  image: string | null;
  // text?: string;
  // font?: string;
  // color?: string;
  // position?: { x: number; y: number };
}

// Define interface for the main document
export interface IGiftProject extends Document {
  name: string
  description: string
  price: number
  userId: mongoose.Types.ObjectId;
  projectName: string;
  giftType: 'T-shirt' | 'Cup' | 'Card' | 'MousePad'; // Use literal types for enum values
  customization: ICustomization;
  image: string
  createdAt: Date;
  updatedAt: Date;
  templateImage: string
}

// Main schema for a customizable gift project
const GiftProjectSchema = new Schema<IGiftProject>({
  name: {type: String, default: null},
  description: {type: String, default: null},
  price: {type: Number, default: null},
  templateImage: {type: String},
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  giftType: {
    type: String,
    enum: Object.values(GiftType),
    required: true
  },
  // customization: {
  //   // The primary user-provided image, stored as a Base64 string.
  //   image: {
  //     type: String,
  //     default: null
  //   }
  //   // You could extend this object with more properties later,
  //   // e.g., text overlays, colors, etc.
  //   // text: { type: String },
  //   // font: { type: String },
  //   // color: { type: String },
  //   // position: { x: Number, y: Number }
  // }
  image: {
      type: String,
      default: null
    }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// To improve query performance, especially when fetching gifts for a user or by type
GiftProjectSchema.index({ userId: 1, giftType: 1 });

const GiftProject = mongoose.model<IGiftProject>('GiftProject', GiftProjectSchema);

export default GiftProject;
export { GiftType };
