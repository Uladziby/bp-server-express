import { getBookById, getBooks, saveBook, removeBook } from './model';

export const resolvers = {
  Query: {
    books: () => getBooks(),
    book: (_, { id }) => getBookById(id),
  },

  Mutation: {
    addBook: (_, { book }) => {
      return saveBook(book);
    },
    removeBook: (_, { id }) => {
      return removeBook(id);
    },
  },
};
