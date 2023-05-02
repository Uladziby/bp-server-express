import mongoose from 'mongoose';

export type mongooseId = mongoose.Types.ObjectId;

export interface IUser {
  _id?: mongooseId;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
  refreshToken?: string;
}

export type LoginDataType = Pick<IUser, 'email' | 'password'>;
