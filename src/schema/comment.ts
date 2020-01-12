import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IComment } from '../interfaces/comment';
import * as softDelete from 'mongoosejs-soft-delete';

const CommentSchema: Schema = new Schema({
  message: { type: String , required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  organizationId: { type: Schema.Types.ObjectId, required: true, ref: 'Organization' },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

export const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);