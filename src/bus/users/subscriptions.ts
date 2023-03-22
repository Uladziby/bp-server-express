import { events } from './events';
import { pubSub } from './../../init/pubSub';

export const subscriptions = {
  userAdded: {
    subscribe: () => pubSub.asyncIterator([events.USER_ADDED]),
  },
};
