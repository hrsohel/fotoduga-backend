import { Document, model, Schema, Types } from "mongoose"

export interface IImage extends Document {
    userId: Types.ObjectId | null
    images: string[]
}

const ImageSchema = new Schema<IImage>({
    userId: {type: Types.ObjectId, ref: "User", default: null},
    images: [{type: String}]
})

const UserImages = model("UserImages", ImageSchema)

export default UserImages