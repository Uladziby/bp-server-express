import { events } from './events';
import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from './model/db';
import { pubSub } from '../../init/pubSub';
import { IUser } from './types';
import { INCORRECT_PASSWORD, USER_NOT_FOUND } from '../../constants';
import { generateTokens } from '../auth/generateTokens';

export const USER_SECRET = 'mysecretkey123';

export const mutations = {
  signUp: async (_, user: IUser) => {
    console.dir(user);
    pubSub.publish(events.USER_ADDED, { userAdded: user });

    const newUser = new UserModel(user);
    await newUser.save();

    return user;
  },
  login: async (_, { loginData }, { req }) => {
    const { email, password } = loginData;

    const user = await UserModel.findOne({ email }).then((user: IUser) => {
      return user;
    });

    pubSub.publish(events.LOGIN_USER, { userLogin: user });

    if (!user) {
      throw new AuthenticationError(USER_NOT_FOUND);
    }

    const isUserValid = user.password === password;

    if (!isUserValid) {
      throw new AuthenticationError(INCORRECT_PASSWORD);
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.email);

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      { new: true },
    );

    //ctx.req.session.token = token;
    /* req.session.accessToken = accessToken;
      req.session.refreshToken = refreshToken; */

    return updatedUser;
  },
  logout: async (_, { id }) => {
    const user = await UserModel.findByIdAndUpdate(id, {
      accessToken: '',
      refreshToken: '',
    });

    pubSub.publish(events.USER_LOGOUT, { user: user });

    return user;
  },
};
