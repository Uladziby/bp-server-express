import { events } from './events';
import { jwt } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { db } from './db';
import { pubSub } from '../../init/pubSub';
import { IUser } from './types';

export const mutations = {
  signUp: (_, user: IUser) => {
    console.log(user);
    db.push(user);
    pubSub.publish(events.USER_ADDED, { userAdded: user });

    return user;
  },
  login: (_, { name, password }, ctx) => {
    const user = db.find((currentUser) => currentUser.name === name);
    const message = 'Your credentials is wrong!';

    if (!user) {
      throw new AuthenticationError(message);
    }

    const isUserValid = user.password === password;

    if (!isUserValid) {
      throw new AuthenticationError(message);
    }

    //const token = jwt.sign({ username: name }, USER_SECRET);
    //ctx.req.session.token = token;

    return user;
  },
};
