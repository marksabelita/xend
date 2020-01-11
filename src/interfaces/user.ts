import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string, 
  avatarUrl: string, 
  followers: number,
  following: number,
  deleted: boolean
};