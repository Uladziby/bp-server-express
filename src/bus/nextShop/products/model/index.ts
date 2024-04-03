import { ProductsModel, ProductsModelType } from './db';

export const getProducts = async () => {
  const products = await ProductsModel.find().then((data) => {
    console.log('getALLProducts', data.length);
    return data;
  });

  return products;
};
