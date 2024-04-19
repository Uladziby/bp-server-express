import { getProductById } from '../products/model/index';
import { ClientCartModel } from './model/schema';
import { BSON } from 'mongodb';

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

  console.log(response, ' response');

  let updatedCart;

  if (response.matchedCount === 1) {
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
