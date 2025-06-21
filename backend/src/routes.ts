import express from 'express';
import { Book } from './services/book';

export const bookRouter = express.Router();

export const books: Book[] = [];

bookRouter.get('/', (req, res) => {
  console.log('Showing all books');
  res.send(books);
});

bookRouter.post('/', (req, res) => {
  console.log('Received request to add a book:', req.body);
  const newBook: Book = req.body;
  books.push(newBook);
  res.send(`The book ${newBook.title} was added successfully!`);
  console.log('Book added:', newBook);
});