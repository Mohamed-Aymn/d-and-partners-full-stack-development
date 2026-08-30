import { MongoClient } from 'mongodb';

export async function connectMongo(uri: string) {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}
