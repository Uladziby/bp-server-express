import { MongoDBService } from './init/initDB';
import { subscriptions } from './bus/users/subscriptions';
import { server, app, httpServer } from './init/server';
import path from 'path';
import * as dotenv from 'dotenv';
import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

dotenv.config({ path: path.join(__dirname, '.env') });

const corsOptions = {
  origin: ['ws://localhost:4000', 'https://studio.apollographql.com'],
};

/* clientMongo
  .connect()
  .then((client) => {
    dbConnection = client.db('book_platform');
    console.dir(dbConnection);
  })
  .catch((err) => {
    console.dir(err);
  });
 */

export let db;

export let mongoDB;

const runServer = async () => {};

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });
});
/*  (await mongoDB.createConnection())
  .collection('users')
  .find({})
  .toArray()
  .then((q) => console.log('users (not error)', q))
  .catch((e) => console.log('error', e)); */
//сделать так чтобы в кверях был метод файнд и аррай

/* mongoDB = new MongoDBService().createConnection().then((db) => {
  console.log('users (not error)', db.collection('users').find().toArray());
}); */

mongoose.connect(process.env.MONGO_URI).then((connection) => {
  console.log('MongoDb connection successful');
});

/* .then((dbConnection) => {
  dbConnection
    .collection('users')
    .find({})
    .toArray()
    .then((q) => {
      db = q;
      console.log('users (not error)', q);
    })
    .catch((e) => console.log('error', e));
}); */

new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve),
);

console.log(
  `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`,
);

runServer();
