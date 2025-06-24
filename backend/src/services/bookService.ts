import { collections } from "./database.service";
import BookModel from "../models/book";

export async function getAllBooks(): Promise<BookModel[]> {
  if (!collections.books) {
    throw new Error("Database connection not established.");
  }
  return await collections.books.find({}).toArray();
}

export async function addBook(newBook: BookModel): Promise<string> {
  if (!collections.books) {
    throw new Error("Database connection not established.");
  }
  const { title, author, pageCount } = newBook;
  if (!title || !author || typeof pageCount !== 'number') {
    throw new Error("Missing or invalid book fields.");
  }
  const result = await collections.books.insertOne(newBook);
  if (!result?.insertedId) {
    throw new Error("Failed to create a new book.");
  }
  return result.insertedId.toString();
}