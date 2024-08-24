import { getProductById } from '../products/model/index';
import { ClientCartModel } from './model/schema';
import { BSON } from 'mongodb';
import { CART_RESPONSE_MESSAGES } from '../../../utils/constants';
import {
  ProductsModelType,
  ProductsSchema,
} from '@/bus/nextShop/products/model/db';

export const getCart = async (cartId: string) => {
  const nid = new BSON.ObjectId(cartId);

  const response = await ClientCartModel.findOne({ _id: nid });

  return response;
};

export const createCart = async () => {
  const response = await ClientCartModel.create({
    products: [],
  });

  return response;
};

export const changeItemQuantity = async ({ cartId, productId, quantity }) => {
  const response = await ClientCartModel.updateOne(
    { _id: cartId },
    { $set: { 'products.$[elem].quantity': quantity } },
    { arrayFilters: [{ 'elem.productId': productId }], new: true },
  );

  let updatedCart;

  if (response.matchedCount === 1) {
    updatedCart = await ClientCartModel.findOne({ _id: cartId });
  }

  console.log(
    'LOG : ChangeItemQuantity',
    `args :${cartId}, ${productId}, ${quantity}`,
    updatedCart,
  );

  return updatedCart;
};

export const addItem = async ({ cartId, input: { productId, quantity } }) => {
  const response = await ClientCartModel.updateOne(
    { _id: cartId },
    { $push: { products: { productId, quantity } } },
  );

  let updatedCart;

  if (response.modifiedCount === 1) {
    updatedCart = await ClientCartModel.findOne({ _id: cartId });
  }

  console.log('AddItem', `args :${cartId}, ${productId}, ${quantity}`);

  return updatedCart;
};

export const getCartProductsById = async (cartId: string) => {
  const cart = await getCart(cartId);

  const products = cart.products.map(async (product) => {
    const cartItem = await getProductById(product.productId);

    if (cartItem) {
      return {
        ...cartItem.toObject(),
        quantity: product.quantity,
        _id: product.productId,
      };
    }
    return null;
  });

  return products;
};

export const removeItem = async ({ cartId, productId }) => {
  let itemMessage: String;
  let cartMessage: String;

  const response = await ClientCartModel.updateOne(
    { _id: cartId },
    { $pull: { products: { productId } } },
  );

  if (response.modifiedCount === 1) {
    cartMessage = await verifyCart(cartId);
    itemMessage = CART_RESPONSE_MESSAGES.productRemoved;
  }

  return { cartMessage, itemMessage };
};

export const verifyCart = async (cartId: string): Promise<String> => {
  const cart = await getCart(cartId);

  if (!cart.products.length) {
    await ClientCartModel.deleteOne({ _id: cartId });

    return CART_RESPONSE_MESSAGES.cartDeleted;
  }

  return CART_RESPONSE_MESSAGES.cartNotEmpty;
};

type ProductData = {
  name: string;
  price: number;
};

export const getDataProductsForStripe = async (cartId: string) => {
  console.log('getDataProductsForStripe', cartId);
  const products = await getCart(cartId).then((res) =>
    res.products.map(async (product) => {
      const cartItem = await getProductById(product.productId);

      return {
        productId: product.productId,
        quantity: product.quantity,
        _id: product.productId,
        name: cartItem ? cartItem.name : 'Product not found',
        price: cartItem ? cartItem.price : 0,
      };
    }),
  );

  return products;
};
