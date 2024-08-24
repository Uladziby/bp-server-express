import { CategoriesModel } from '../../../bus/nextShop/categories/schema';
import { ProductsModel } from '../../../bus/nextShop/products/model/db';
import { PipelineStage } from 'mongoose';

export const getCategories = async ({ take, skip }) => {
  const pipeline: PipelineStage[] = [
    { $skip: skip },
    { $limit: take },
    { $addFields: { id: '$_id' } },
    { $unset: '_id' },
  ];

  const products = await CategoriesModel.aggregate(pipeline);

  const total = await CategoriesModel.countDocuments();

  return { data: products, meta: { total, count: products.length } };
};

export const getCategoryBySlug = async ({ slug }) => {
  const response = await ProductsModel.find({
    'category.slug': `${slug}`,
  });

  console.log(slug, 'slug', response, 'response');

  return {
    data: response,
    meta: { total: response.length, count: response.length },
  };
};
