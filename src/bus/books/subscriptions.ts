import { events } from './events';
import { pubSub } from './../../init/pubSub';

export const subscriptions = {
  book: {
    subscribe: () =>
      pubSub.asyncIterator([events.BOOK_ADDED, events.BOOK_UPDATED]),
  },
};
