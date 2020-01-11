import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IOrganization } from '../interfaces/organization';

const OrganizationSchema: Schema = new Schema({
  name: { type: String , required: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  deleted: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at' } });

export const Organization = mongoose.models.Organization || mongoose.model<IOrganization>("Organization", OrganizationSchema);
