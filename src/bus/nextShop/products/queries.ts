import { getProducts } from './model';

export const queries = {
  products: (params) => {
    console.log('products', params);
    return getProducts();
  },
};
