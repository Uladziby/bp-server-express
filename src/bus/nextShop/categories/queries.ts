import { getCategories, getCategoryBySlug } from './index';

export const queries = {
  categories: (_, args) => getCategories(args),
  category: (_, args) => getCategoryBySlug(args),
};
