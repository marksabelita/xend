import { Document } from 'mongoose';
import { IUser } from './user';
import { IOrganization } from './Organization';

export interface IComment extends Document {
  message: { type: String , required: true },
  owner: IUser,
  organizationId: IOrganization
};