import { getProductById, getProducts, getReviewsById } from './model';

export const queries = {
  products: (_, args) => getProducts(args),
  product: (_, { id }) => getProductById(id),
  reviews: (_, { id }) => getReviewsById(id),
};
