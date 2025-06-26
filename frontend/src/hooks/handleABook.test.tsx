import handleAddBook from "./handleABook";
import Book from "../interfaces/Book";

describe("handleAddBook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    ) as jest.Mock;
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls fetch with correct parameters", async () => {
    const book: Book = {
      title: "Test Title",
      author: "Test Author",
      pageCount: 123,
      pagesPerDayGoal: 10,
      daysToFinish: 12,
    };

    await handleAddBook(book);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/books"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      })
    );
  });

  it("logs book saving and success messages", async () => {
    const book: Book = {
      title: "Test Title",
      author: "Test Author",
      pageCount: 123,
    };

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await handleAddBook(book);

    expect(logSpy).toHaveBeenCalledWith("Saving book", book);
    expect(logSpy).toHaveBeenCalledWith("Book saved successfully:", book);

    logSpy.mockRestore();
  });
});