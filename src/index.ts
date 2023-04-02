import { subscriptions } from './bus/users/subscriptions';
import { server, app, httpServer } from './init/server';
import path from 'path';
import * as dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config({ path: path.join(__dirname, '.env') });

const corsOptions = {
  origin: ['ws://localhost:4000', 'https://studio.apollographql.com'],
};

dotenv.config({ path: path.join(__dirname, '.env') });

const clientMongo = new MongoClient(process.env.MONGO_URI, {
  serverApi: ServerApiVersion.v1,
});

const runServer = async () => {
  await server.start();

  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });

  clientMongo.connect();

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve),
  );

  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`,
  );
};

runServer();
