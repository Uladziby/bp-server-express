import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { join } from 'node:path';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from './resolvers';

const schema = loadSchemaSync(join(__dirname, '/types.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const app: Express = express();

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema: schemaWithResolvers,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        console.log('Server starting up!');
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
