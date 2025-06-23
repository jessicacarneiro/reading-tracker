import express from 'express';
import request from 'supertest';
import { bookRouter } from './routes';
import { collections } from './services/database.service';

const app = express();
app.use(express.json());
app.use('/books', bookRouter);

beforeEach(() => {
  // Mock the books collection with jest.fn()
  collections.books = {
    find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([]) }),
    insertOne: jest.fn().mockResolvedValue({ insertedId: 'mockId' }),
  } as any;
});

afterEach(() => {
  collections.books = undefined;
});

describe('Book Routes', () => {
  it('GET /books should return an empty array when there are no books', async () => {
    (collections.books.find as jest.Mock).mockReturnValueOnce({ toArray: jest.fn().mockResolvedValue([]) });
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /books should add a new book', async () => {
    const newBook = { title: 'Test Book', author: 'Test Author', pageCount: 100 };
    const res = await request(app).post('/books').send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.text).toContain('Successfully created a new book');
  });
});