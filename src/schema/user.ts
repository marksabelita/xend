import * as mongoose from 'mongoose'; 
import { IUser } from '../interfaces/User';
import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  email: { type: String , required: true },
  avatarUrl: { type: String },
  followers: { type: Number },
  following: { type: Number },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);