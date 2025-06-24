import { collections } from "./database.service";
import BookModel from "../models/book";
import { ObjectId } from "mongodb";

export async function getAllBooks(): Promise<BookModel[]> {
  if (!collections.books) {
    throw new Error("Database connection not established.");
  }
  return await collections.books.find({}).toArray();
}

export async function updateBook(id: string, updatedBook: BookModel): Promise<string> {
  if (!collections.books) {
    throw new Error("Database connection not established.");
  }
  if (!id || !updatedBook) {
    throw new Error("Missing book ID or updated book data.");
  }
  const query = { _id: new ObjectId(id) };
  const result = await collections.books.updateOne(query, { $set: updatedBook });
  
  if (!result) {
    throw new Error("Failed to update book.");
  }
  if (result.modifiedCount === 0) {
    throw new Error("Failed to update book or no changes made.");
  }

  return id;
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