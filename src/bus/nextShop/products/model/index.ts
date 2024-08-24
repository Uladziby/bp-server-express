import { PRODUCT_CREATED, REVIEW_ADDED } from './../../../../utils/constants';
import { ProductsModel } from './db';
import { BSON } from 'mongodb';
import {
  MutationCreateReviewArgs,
  Product,
  ProductCreateInput,
  QueryProductsArgs,
  Review,
} from '@/gql/graphql';

export const getProducts = async ({
  take,
  order,
  orderBy,
  search,
  skip,
}: QueryProductsArgs) => {
  console.log(
    'LOG : GetProductsByOrder',
    `${take}: take, ${order}:order, ${orderBy}:orderBy`,
    `${skip}:skip`,
  );

  const parsedOrder = order === 'ASC' ? 1 : -1;
  const parsedOrderBy = orderBy === 'DEFAULT' ? '_id' : orderBy.toLowerCase();

  const products = await ProductsModel.find()
    .sort({ [parsedOrderBy]: parsedOrder })
    .limit(take)
    .skip(skip)
    .then((res) =>
      res.map((product) => {
        return {
          ...product.toObject(),
          id: product._id,
        };
      }),
    );

  const total = await ProductsModel.countDocuments();
  console.log(products, 'products');
  return { data: products, meta: { total, count: products.length } };
};

export const getProductById = async (id: string) => {
  const nid = new BSON.ObjectId(id);
  const product = await ProductsModel.findOne({
    _id: nid,
  }).catch((e) => {
    console.log('getProductById error', e);
  });

  return product;
};

export const getReviewsById = async (id: string) => {
  const nid = new BSON.ObjectId(id);
  const product = await ProductsModel.findOne({
    _id: nid,
  });

  return product && product ? product.reviews : [];
};

export const createReview = async ({
  title,
  productId,
  rating,
  description,
  email,
  author,
}: MutationCreateReviewArgs) => {
  const nid = new BSON.ObjectId(productId);

  const newReview: Omit<Review, '_id'> = {
    author,
    createdAt: new Date().toISOString(),
    description,
    rating,
    email: email,
    title,
    updatedAt: new Date().toISOString(),
  };

  await ProductsModel.updateOne(
    { _id: nid },
    { $push: { reviews: newReview } },
  ).catch((e) => {
    console.log('createReview error', e);
  });
  return REVIEW_ADDED;
};

export const createProduct = async ({
  input,
}: {
  input: ProductCreateInput;
}) => {
  const { name, price, image, category, description, collection } = input;

  const newProduct: Product = {
    description,
    name,
    category: {
      slug: category.toLocaleLowerCase(),
      name: category,
    },
    collection,
    id: '',
    images: [
      {
        url: image,
        alt: name,
        height: 300,
        width: 200,
      },
    ],
    rating: 0,
    reviews: [],
    slug: `${name}-${collection}`,
    price,
  };

  await ProductsModel.create(newProduct)
    .then((res) => {
      console.log('createProduct', res);
    })
    .catch((e) => {
      console.log('createProduct error', e);
    });
  return PRODUCT_CREATED;
};
