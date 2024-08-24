import { createProduct, createReview } from './model/index';

export const mutations = {
  createReview: (_, args) => createReview(args),
  createProduct: (_, args) => createProduct(args),
};
