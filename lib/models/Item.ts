import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  price: number;
  status: string;
  sellerId: string;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'available' },
  sellerId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);
