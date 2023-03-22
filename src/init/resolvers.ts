import { mutations as bookMutations } from './../bus/books/mutations';
import { mutations as usersMutations } from './../bus/users/mutations';
import { queries as bookQueries } from '../bus/books/queries';
import { queries as usersQueries } from '../bus/users/queries';

import { subscriptions as userSubscription } from '../bus/users/subscriptions';

export const resolvers = {
  Query: {
    ...bookQueries,
    ...usersQueries,
  },

  Mutation: {
    ...bookMutations,
    ...usersMutations,
  },

  Subscription: {
    ...userSubscription,
  },
};
