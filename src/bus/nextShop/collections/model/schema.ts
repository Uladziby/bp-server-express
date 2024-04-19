import mongoose from 'mongoose';

const CollectionsSchema = new mongoose.Schema({
  description: String,
  slug: String,
  name: String,
  id: String,
  _id: String,
  image: {
    url: String,
    alt: String,
  },
});

export const CollectionsModel = mongoose.model(
  'collections',
  CollectionsSchema,
);
