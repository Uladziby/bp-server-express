import { BooksDBType, IBook } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialDB: BooksDBType[] = [
  ['id-1', { title: 'Harrty Potter', author: 'Rowling' }],
  ['id-2', { title: 'Harrty Rob', author: 'Rowling' }],
];

const booksDB = new Map(initialDB);

export const getBooks = () => {
  const books = [];

  booksDB.forEach((value, key) => {
    const currentBook = {
      id: key,
      ...value,
    };
    books.push(currentBook);
  });

  return books;
};

export const getBookById = (id: string) => {
  const book = booksDB.get(id);

  return { id, ...book };
};

export const saveBook = (book: IBook) => {
  const id = uuidv4();
  booksDB.set(id, book);
  const savedBook = booksDB.get(id);

  return { id, ...savedBook };
};

export const removeBook = (id) => {
  const expectedBook = booksDB.get(id);
  booksDB.delete(id);

  return { id, ...expectedBook };
};
