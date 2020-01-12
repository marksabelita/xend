import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IOrganization } from '../interfaces/organization';

const OrganizationSchema: Schema = new Schema({
  name: { type: String , required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  deleted: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at' } });

export const Organization = mongoose.models.Organization || mongoose.model<IOrganization>("Organization", OrganizationSchema);
