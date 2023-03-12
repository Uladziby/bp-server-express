import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { loadSchemaSync } from '@graphql-tools/load';
import { resolvers } from '../resolvers';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'node:path';

const app = express();

const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const apolloServer = new ApolloServer({ schema: schemaWithResolvers });

const server = apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: '/' });
});

export { server, app };
