import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  author: string;
  message: string;
}

const messageSchema = new Schema<IMessage>({
  author: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model<IMessage>('Message', messageSchema);