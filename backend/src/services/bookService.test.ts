import { collections } from "./database.service";
import { getAllBooks, addBook, updateBook } from "./bookService";
import BookModel from "../models/book";
import { Collection } from "mongodb";

describe("bookService", () => {
  beforeEach(() => {
    collections.books = {
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([
          { title: "Book 1", author: "Author 1", pageCount: 100 },
        ]),
      }),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "mockId" }),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
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

  describe("updateBook", () => {
    it("should update a book and return the id", async () => {
      const id = "507f1f77bcf86cd799439011";
      const updatedBook = {
        title: "Updated",
        author: "Author",
        pageCount: 123,
      } as BookModel;
      const result = await updateBook(id, updatedBook);
      expect(result).toBe(id);
      expect(collections.books?.updateOne).toHaveBeenCalled();
    });

    it("should throw if database is not connected", async () => {
      collections.books = undefined;
      const id = "507f1f77bcf86cd799439011";
      const updatedBook = {
        title: "Updated",
        author: "Author",
        pageCount: 123,
      } as BookModel;
      await expect(updateBook(id, updatedBook)).rejects.toThrow(
        "Database connection not established."
      );
    });

    it("should throw if id or updatedBook is missing", async () => {
      await expect(updateBook("", {} as BookModel)).rejects.toThrow(
        "Missing book ID or updated book data."
      );
    });

    it("should throw if updateOne returns modifiedCount 0", async () => {
      (collections.books!.updateOne as jest.Mock).mockResolvedValueOnce({
        modifiedCount: 0,
      });
      const id = "507f1f77bcf86cd799439011";
      const updatedBook = {
        title: "Updated",
        author: "Author",
        pageCount: 123,
      } as BookModel;
      await expect(updateBook(id, updatedBook)).rejects.toThrow(
        "Failed to update book or no changes made."
      );
    });

    it("should throw if updateOne returns a falsy result", async () => {
      (collections.books!.updateOne as jest.Mock).mockResolvedValueOnce(
        undefined
      );
      const id = "507f1f77bcf86cd799439011";
      const updatedBook = {
        title: "Updated",
        author: "Author",
        pageCount: 123,
      } as BookModel;
      await expect(updateBook(id, updatedBook)).rejects.toThrow(
        "Failed to update book."
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
