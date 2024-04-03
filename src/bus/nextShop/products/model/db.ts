import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
  description: String,
  price: Number,
  name: String,
  rating: Number,
  slug: String,
  images: [
    {
      url: String,
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

export const ProductsModel = mongoose.model('products', ProductsSchema);

export type ProductsModelType = typeof ProductsModel;
