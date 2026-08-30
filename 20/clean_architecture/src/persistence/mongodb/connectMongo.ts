import { MongoClient, type Db } from 'mongodb';

let client: MongoClient | undefined;
let connecting: Promise<MongoClient> | undefined;

export async function getMongoClient(uri: string): Promise<MongoClient> {
  if (client) {
    return client;
  }

  if (!connecting) {
    connecting = (async () => {
      const instance = new MongoClient(uri);
      await instance.connect();
      client = instance;
      return instance;
    })();
  }

  return connecting;
}

export async function getMongoDb(uri: string, dbName: string): Promise<Db> {
  const mongoClient = await getMongoClient(uri);
  return mongoClient.db(dbName);
}

export async function closeMongo() {
  if (!client) {
    connecting = undefined;
    return;
  }

  await client.close();
  client = undefined;
  connecting = undefined;
}
