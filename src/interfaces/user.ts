import { Document } from 'mongoose';
import { IOrganization } from './Organization';

export interface IUser extends Document {
  email: string, 
  avatarUrl: string, 
  followers: number,
  following: number,
  deleted: boolean
};