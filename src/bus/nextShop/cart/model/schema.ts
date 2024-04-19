import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const ClientCartSchema = new mongoose.Schema({
  products: [
    {
      quantity: Number,
      productId: String,
    },
  ],
});

export const ClientCartModel = mongoose.model(
  'clients_carts',
  ClientCartSchema,
);
