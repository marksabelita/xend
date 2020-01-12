import { Document } from 'mongoose';
import { IUser } from './user';
import { IComment } from './comment';
export interface IOrganization extends Document {
  name: string,
  owner: IUser,
  members: [ IUser ],
  comments: [ IComment ],
  deleted: boolean
};