import { server, app, httpServer } from './init/server';
import path from 'path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: path.join(__dirname, '.env') });

const corsOptions = {
  origin: [
    'ws://localhost:4000',
    'https://studio.apollographql.com',
    'http://localhost:3000',
  ],
};

export let db;

export let mongoDB;

const runServer = async () => {};

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });
});

mongoose.connect(process.env.MONGO_URI).then((connection) => {
  console.log('MongoDb connection successful');
});

new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(
  `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`,
);

runServer();
