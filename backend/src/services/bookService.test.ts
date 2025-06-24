import { collections } from "./database.service";
import { getAllBooks, addBook } from "./bookService";
import BookModel from "../models/book";
import { Collection } from "mongodb";

describe("bookService", () => {
  beforeEach(() => {
    collections.books = {
      find: jest.fn().mockReturnValue({
        toArray: jest
          .fn()
          .mockResolvedValue([
            { title: "Book 1", author: "Author 1", pageCount: 100 },
          ]),
      }),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "mockId" }),
    } as unknown as Collection<BookModel>;
  });

  afterEach(() => {
    collections.books = undefined;
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    it("should return all books", async () => {
      const books = await getAllBooks();
      expect(Array.isArray(books)).toBe(true);
      expect(books[0].title).toBe("Book 1");
    });

    it("should throw if database is not connected", async () => {
      collections.books = undefined;
      await expect(getAllBooks()).rejects.toThrow(
        "Database connection not established."
      );
    });
  });

  describe("addBook", () => {
    it("should add a book and return insertedId", async () => {
      const newBook = { title: "Test", author: "Tester", pageCount: 123 };
      const insertedId = await addBook(newBook as BookModel);
      expect(insertedId).toBe("mockId");
      expect(collections.books?.insertOne).toHaveBeenCalledWith(newBook);
    });

    it("should throw if required fields are missing", async () => {
      const badBook = { title: "", author: "", pageCount: undefined };
      await expect(addBook(badBook as BookModel)).rejects.toThrow(
        "Missing or invalid book fields."
      );
    });

    it("should throw if database is not connected", async () => {
      collections.books = undefined;
      const newBook = { title: "Test", author: "Tester", pageCount: 123 };
      await expect(addBook(newBook as BookModel)).rejects.toThrow(
        "Database connection not established."
      );
    });

    it("should throw if insertOne fails", async () => {
      (collections.books!.insertOne as jest.Mock).mockResolvedValueOnce({});
      const newBook = { title: "Test", author: "Tester", pageCount: 123 };
      await expect(addBook(newBook as BookModel)).rejects.toThrow(
        "Failed to create a new book."
      );
    });
  });
});
