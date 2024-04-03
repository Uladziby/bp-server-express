import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  accessToken: String,
  refreshToken: String,
});

export const UserModel = mongoose.model('user', UserSchema);
