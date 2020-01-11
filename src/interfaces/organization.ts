import { Document } from 'mongoose';
import { IUser } from './user';

export interface IOrganization extends Document {
  name: string,
  owner: IUser['_id'],
  deleted: boolean
};