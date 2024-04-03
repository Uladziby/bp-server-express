import { BooksDBType, IBook } from '../../../types';
import { BookType } from '../queries';
import { booksDB } from './db';
import { v4 as uuidv4 } from 'uuid';

export const getBooks = () => {
  const books: BookType[] = [];

  booksDB.forEach((value, key) => {
    const currentBook = {
      id: key,
      ...value,
    };
    books.push(currentBook);
  });

  return books;
};

export const getBookById = (id: string): BookType => {
  const book = booksDB.get(id);

  if (book!) {
    throw new Error(`We dont have a book with id : ${id}`);
  }

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

export const updateBook = (id: string, recievedBook: IBook) => {
  const previousBook = booksDB.get(id);
  const expectedBook = { ...previousBook, ...recievedBook };
  removeBook(id);
  booksDB.set(id, expectedBook);
  const savedBook = booksDB.get(id);

  return { id, ...savedBook };
};
