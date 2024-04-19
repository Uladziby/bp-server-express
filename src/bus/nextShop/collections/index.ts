import { ProductsModel } from './../products/model/db';
import { CollectionsModel } from './model/schema';

export const getCollections = async ({ take, skip }) => {
  const collections = await CollectionsModel.find().skip(skip).limit(take);

  const total = await CollectionsModel.countDocuments();

  return { data: collections, meta: { total, count: collections.length } };
};

export const getCollectionProductsBySlug = async (slug) => {
  const products = await ProductsModel.find({ collection: slug });

  return {
    data: products,
    meta: { total: products.length, count: products.length },
  };
};

export const getCollectionBySlug = async (slug: string) => {
  const response = await CollectionsModel.findOne({ slug });
  return response;
};
