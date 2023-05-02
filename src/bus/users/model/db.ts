import mongoose from 'mongoose';
import { IUser } from '../types';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  accessToken: String,
  refreshToken: String,
});

export const UserModel = mongoose.model('user', UserSchema);

/* 
export const userCollection = db.collection('users')
.find({})
.toArray()
.then((q) => console.log('users (not error)', q))
.catch((e) => console.log('error', e)); */

//export const db = mongoDB.getCollection('users');

/* mongoDB.dbConnection
  .collection('users')
  .find({})
  .toArray()
  .then((q) => console.log('users (not error)', q))
  .catch((e) => console.log('error', e)); */

/* export const dbMock: IUser[] = [
  {
    name: 'Oliver',
    email: 'oliver@gmail.com',
    password: '123',
  },
  {
    name: 'guliver',
    email: 'oliver@gmail.com',
    password: '123',
  },
  {
    name: 'Bormalej',
    email: 'oliver@gmail.com',
    password: '122323',
  },
]; */
