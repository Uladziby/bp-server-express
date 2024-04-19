import { addItem, changeItemQuantity, createCart } from './index';

export const mutations = {
  cartCreate: () => createCart(),
  cartChangeItemQuantity: (_, args) => changeItemQuantity(args),
  cartAddItem: (_, args) => addItem(args),
};
