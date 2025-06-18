import express from 'express';
import { Book } from './book';

export const bookRouter = express.Router();

export const books: Book[] = [];

bookRouter.get('/', (req, res) => {
  res.send(books);
});

bookRouter.post('/', (req, res) => {
  const newBook: Book = req.body;
  books.push(newBook);
  res.send(`The book ${newBook.title} was added successfully!`);
});