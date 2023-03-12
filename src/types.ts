export interface IBook {
  title: string;
  author: string;
}

export type BooksDBType = [string, IBook];
