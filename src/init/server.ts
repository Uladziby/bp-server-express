import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { loadSchemaSync } from '@graphql-tools/load';
import { resolvers } from './resolvers';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {
  addResolversToSchema,
  makeExecutableSchema,
} from '@graphql-tools/schema';
import { join } from 'node:path';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.

const typeDefs = loadSchemaSync(join(__dirname, '/types.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
//const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = http.createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema: schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

export { server, httpServer, app };
