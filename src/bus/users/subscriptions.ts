import { events } from './events';
import { pubSub } from './../../init/pubSub';

export const subscriptions = {
  user: {
    subscribe: () =>
      pubSub.asyncIterator([events.USER_ADDED, events.USER_LOGOUT]),
  },
};
