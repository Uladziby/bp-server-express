import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  description: String,
  price: Number,
  name: String,
  rating: Number,
  slug: String,
  collection: String,
  category: {
    slug: String,
    name: String,
  },
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  reviews: [
    {
      createdAt: Date,
      description: String,
      email: String,
      author: String,
      id: String,
      rating: Number,
      title: String,
      updatedAt: Date,
    },
  ],
});

export const ProductsModel = mongoose.model('products_models', ProductsSchema);

export type ProductsModelType = typeof ProductsModel;
