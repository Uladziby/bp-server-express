import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import * as mongodb from 'mongodb';

export let dbConnection: Db;
export const BOOK_PLATFORM = 'book_platform';

export class MongoDBService {
  dbConnection: Db;
  clientMongo: MongoClient;
  usersDb: mongodb.Collection<mongodb.Document>;

  constructor() {
    this.clientMongo = new MongoClient(process.env.MONGO_URI, {
      serverApi: ServerApiVersion.v1,
    });
  }

  async createConnection() {
    await this.clientMongo
      .connect()
      .then((client) => {
        this.dbConnection = client.db(BOOK_PLATFORM);
        console.dir('MongoDb connection successful');
      })
      .catch((err) => {
        console.dir(err);
      });

    return this.dbConnection;
  }

  async getCollection(nameCollection: string) {
    return this.dbConnection.collection(nameCollection);
  }
}
