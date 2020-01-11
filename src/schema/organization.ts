import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IOrganization } from '../interfaces/organization';
import softDelete from 'mongoose-soft-deleted';

const OrganizationSchema: Schema = new Schema({
  name: { type: String , required: true },
  owner: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: { createdAt: 'created_at' } }).plugin(softDelete);

export const Organization = mongoose.models.Organization || mongoose.model<IOrganization>("Organization", OrganizationSchema);
