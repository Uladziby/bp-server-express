import { CategoriesModel } from '@/bus/nextShop/categories/schema';
import { PipelineStage } from 'mongoose';

export const getCategories = async ({ take, skip }) => {
  /* 
    const products = await ProductsModel.find()
      .skip(skip)
      .limit(take)
      .sort({ [parsedOrderBy]: parsedOrder })
      .then((data) => {
        console.log('getALLProducts', data[0]._id);
        [...data, { id: data.id }];
        return data;
      }); */

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
