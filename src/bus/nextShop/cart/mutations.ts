import { addItem, changeItemQuantity, createCart, removeItem } from './index';

export const mutations = {
  cartCreate: () => createCart(),
  cartChangeItemQuantity: (_, args) => changeItemQuantity(args),
  cartAddItem: (_, args) => addItem(args),
  cartRemoveItem: (_, args) => removeItem(args),
};
