import express, { Request, Response } from "express";
import BookModel from "./models/book";
import { getAllBooks, addBook } from "./services/bookService";

export const bookRouter = express.Router();

bookRouter.get("/", async (_req: Request, res: Response) => {
  console.log("Showing all books");
  try {
    const books = await getAllBooks();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || "Unknown error occurred");
  }
});

bookRouter.post("/", async (req: Request, res: Response) => {
  console.log("Received request to add a book:", req.body);
  try {
    const newBook = req.body as BookModel;
    const insertedId = await addBook(newBook);
    res
      .status(201)
      .send(`Successfully created a new book with id ${insertedId}`);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(400).send(error.message);
  }
});
