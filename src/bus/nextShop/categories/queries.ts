import { getCategories } from '@/bus/nextShop/categories';

export const queries = {
  categories: (_, args) => getCategories(args),
};
