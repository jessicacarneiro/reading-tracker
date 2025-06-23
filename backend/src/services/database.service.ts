import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import BookModel from "../models/book";

dotenv.config();

export const collections: { books?: mongoDB.Collection<BookModel> } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const booksCollection = db.collection<BookModel>(
    process.env.BOOKS_COLLECTION_NAME
  );

  collections.books = booksCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${booksCollection.collectionName}`
  );
}
