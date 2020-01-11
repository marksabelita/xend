import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IComment } from '../interfaces/comment';
import softDelete from 'mongoose-soft-deleted';

const CommentSchema: Schema = new Schema({
  message: { type: String , required: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  organizationId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true });

export const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);