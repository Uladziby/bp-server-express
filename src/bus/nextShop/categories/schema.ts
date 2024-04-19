import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema({
  description: String,
  slug: String,
  _id: String,
  products: {
    slug: String,
    id: String,
  },
});

export const CategoriesModel = mongoose.model('categories', CategoriesSchema);
