import {
  getCollectionBySlug,
  getCollectionProductsBySlug,
  getCollections,
} from './index';

export const queries = {
  collections: (_, args) => getCollections(args),
  collectionProducts: (_, { slug }) => getCollectionProductsBySlug(slug),
  collection: (_, { slug }) => getCollectionBySlug(slug),
};
