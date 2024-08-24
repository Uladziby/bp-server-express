import {
  getCart,
  getCartProductsById,
  getDataProductsForStripe,
} from '../cart/index';

export const queries = {
  cart: (_, { cartId }) => getCart(cartId),
  cartProductsById: (_, { cartId }) => getCartProductsById(cartId),
  cartDataProductsForStripe: (_, { cartId }) =>
    getDataProductsForStripe(cartId),
};
