import express, { Request, Response } from "express";
import { collections } from "./services/database.service";
import BookModel from "./models/book";

export const bookRouter = express.Router();

bookRouter.get("/", async (_req: Request, res: Response) => {
  console.log("Showing all books");
  try {
    const books = await collections.books.find({}).toArray();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || "Unknown error occurred");
  }
});

bookRouter.post("/", async (req: Request, res: Response) => {
  console.log('Received request to add a book:', req.body);
  try {
    if (!collections.books) {
      return res.status(500).send("Database connection not established.");
    }

    const newBook = req.body as BookModel;
    const { title, author, pageCount } = newBook;

    if (!title || !author || typeof pageCount !== 'number') {
      return res.status(400).send('Missing or invalid book fields.');
    }

    const result = await collections.books.insertOne(newBook);

    return result
      ? res.status(201).send(`Successfully created a new book with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new book.");
  } catch (error) {
    console.error('Error adding book:', error);
    return res.status(400).send(error.message);
  }
});
