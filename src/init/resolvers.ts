import { mutations as bookMutations } from './../bus/books/mutations';
import { mutations as usersMutations } from './../bus/users/mutations';
import { queries as bookQueries } from '../bus/books/queries';
import { queries as usersQueries } from '../bus/users/queries';
import { queries as productsQueries } from '../bus/nextShop/products/queries';

import { subscriptions as userSubscription } from '../bus/users/subscriptions';
import { subscriptions as bookSubscription } from '../bus/books/subscriptions';

export const resolvers = {
  Query: {
    ...bookQueries,
    ...usersQueries,
    ...productsQueries,
  },
  Mutation: {
    ...bookMutations,
    ...usersMutations,
  },
  Subscription: {
    ...userSubscription,
    ...bookSubscription,
  },
};
