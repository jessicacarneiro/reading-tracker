import express from 'express';
import request from 'supertest';
import { books } from './routes';
import { bookRouter } from './routes';

const app = express();
app.use(express.json());
app.use('/books', bookRouter);

beforeEach(() => {
  books.length = 0;
});

describe('Book Routes', () => {
  it('GET /books should return an empty array when there are no books', async () => {
    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /books should add a new book', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      pageCount: 100,
    };

    const res = await request(app).post('/books').send(newBook);

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`The book ${newBook.title} was added successfully!`);
  });

  it('GET /books should return all books when books are present', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      pageCount: 100,
    };
    await request(app).post('/books').send(newBook);

    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([newBook]);
  });
});