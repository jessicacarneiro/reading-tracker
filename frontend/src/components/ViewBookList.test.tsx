import { render, screen, waitFor } from "@testing-library/react";
import ViewBookList from "./ViewBookList";

describe("ViewBookList component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shows loading initially", () => {
    render(<ViewBookList apiUrl="http://localhost:3030" />);
    expect(screen.getByText(/Loading books/i)).toBeInTheDocument();
  });

  it("renders a list of books after fetch (without pagesPerDayGoal)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { title: "Book 1", author: "Author 1", pageCount: 100 },
            { title: "Book 2", author: "Author 2", pageCount: 200 },
          ]),
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList apiUrl="http://localhost:3030" />);

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
      expect(screen.getByText("Author 1")).toBeInTheDocument();
      expect(screen.getByText("Author 2")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
    });
  });

  it("renders a list of books with pagesPerDayGoal when present", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { title: "Book 3", author: "Author 3", pageCount: 300, pagesPerDayGoal: 30 },
            { title: "Book 4", author: "Author 4", pageCount: 400 },
          ]),
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList apiUrl="http://localhost:3030" />);

    await waitFor(() => {
      expect(screen.getByText("Book 3")).toBeInTheDocument();
      expect(screen.getByText("Author 3")).toBeInTheDocument();
      expect(screen.getByText("300")).toBeInTheDocument();
      expect(screen.getByText("30")).toBeInTheDocument(); // pagesPerDayGoal present

      expect(screen.getByText("Book 4")).toBeInTheDocument();
      expect(screen.getByText("Author 4")).toBeInTheDocument();
      expect(screen.getByText("400")).toBeInTheDocument();
      // pagesPerDayGoal not present for Book 4, so cell should be empty
      const rows = screen.getAllByRole("row");
      // Find the row for Book 4 and check the last cell is empty
      const book4Row = rows.find(row => row.textContent?.includes("Book 4"));
      expect(book4Row?.lastElementChild?.textContent).toBe("");
    });
  });

  it("shows 'No books found.' if the list is empty", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList apiUrl="http://localhost:3030" />);
    await waitFor(() => {
      expect(screen.getByText(/No books found/i)).toBeInTheDocument();
    });
  });

  it("shows an error message if fetch fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList apiUrl="http://localhost:3030" />);
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});