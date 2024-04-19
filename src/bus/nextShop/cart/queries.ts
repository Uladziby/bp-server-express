import { getCart, getCartProductsById } from '../cart/index';

export const queries = {
  cart: (_, { cartId }) => getCart(cartId),
  cartProductsById: (_, { cartId }) => getCartProductsById(cartId),
};
