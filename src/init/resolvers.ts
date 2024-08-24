import { mutations as bookMutations } from './../bus/books/mutations';
import { mutations as usersMutations } from './../bus/users/mutations';
import { mutations as productsMutations } from '../bus/nextShop/products/mutations';
import { mutations as cartMutations } from '../bus/nextShop/cart/mutations';

import { queries as bookQueries } from '../bus/books/queries';
import { queries as usersQueries } from '../bus/users/queries';
import { queries as productsQueries } from '../bus/nextShop/products/queries';
import { queries as collectionsQueries } from '../bus/nextShop/collections/queries';
import { queries as cartQueries } from '../bus/nextShop/cart/queries';
import { queries as categoriesQuery } from '../bus/nextShop/categories/queries';

import { subscriptions as userSubscription } from '../bus/users/subscriptions';
import { subscriptions as bookSubscription } from '../bus/books/subscriptions';

export const resolvers = {
  Query: {
    ...bookQueries,
    ...usersQueries,
    ...productsQueries,
    ...cartQueries,
    ...collectionsQueries,
    ...categoriesQuery,
  },
  Mutation: {
    ...bookMutations,
    ...usersMutations,
    ...productsMutations,
    ...cartMutations,
  },
  Subscription: {
    ...userSubscription,
    ...bookSubscription,
  },
};
