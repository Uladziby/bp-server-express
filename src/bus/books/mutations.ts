import { saveBook, removeBook, updateBook } from './model';

export const mutations = {
  addBook: (_, { book }) => {
    return saveBook(book);
  },
  removeBook: (_, { id }) => {
    return removeBook(id);
  },
  updateBook: (_, { id, book }) => {
    return updateBook(id, book);
  },
};
