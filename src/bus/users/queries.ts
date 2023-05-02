import { UserModel } from './model/db';

export const queries = {
  users: async () => {
    const users = await UserModel.find().then((users) =>
      users.map(({ email, password }) => ({
        email,
        password,
      })),
    );

    return users;
  },
};
