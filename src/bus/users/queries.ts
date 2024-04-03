import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from './model/db';
import { USER_NOT_FOUND, INCORRECT_PASSWORD } from '../../constants';
import { generateTokens } from '../auth/generateTokens';
import { IUser } from './types';

export const queries = {
  users: async () => {
    const users = await UserModel.find().then((users) => {
      console.log('getALLUsers', users.length);
      return users.map(({ email, password }) => ({
        email,
        password,
      }));
    });

    return users;
  },
};
