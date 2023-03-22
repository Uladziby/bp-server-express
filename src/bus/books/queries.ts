import { ApolloError } from 'apollo-server-express';
import { getBookById, getBooks } from './model';

export const queries = {
  books: () => getBooks(),
  book: (_, { id }) => {
    try {
      getBookById(id);
    } catch ({ message }) {
      throw new ApolloError(message);
    }
  },
};
