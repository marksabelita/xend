import * as mongoose from 'mongoose'; 
import { Schema } from 'mongoose';
import { IUser } from '../interfaces/User';
import softDelete from 'mongoose-soft-deleted';

export const UserSchema: Schema = new Schema({
  email: { type: String , required: true },
  avatarUrl: { type: String },
  followers: { type: Number },
  following: { type: Number }
}, { timestamps: true }).plugin(softDelete);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);