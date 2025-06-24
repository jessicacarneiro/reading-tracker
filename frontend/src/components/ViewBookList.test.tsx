import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ViewBookList from "./ViewBookList";

describe("ViewBookList component", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    ) as jest.Mock;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shows loading initially", () => {
    render(<ViewBookList apiUrl="http://localhost:3030" />);
    expect(screen.getByText(/Loading books/i)).toBeInTheDocument();
  });

  it("renders a list of books after fetch (without pagesPerDayGoal or daysToFinish)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { _id: "1", title: "Book 1", author: "Author 1", pageCount: 100 },
            { _id: "2", title: "Book 2", author: "Author 2", pageCount: 200 },
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
      // Edit icons
      expect(
        screen.getAllByRole("button", { name: /edit book/i })
      ).toHaveLength(2);

      // Days to finish cells should be empty
      const rows = screen.getAllByRole("row");
      rows.forEach((row) => {
        if (
          row.textContent?.includes("Book 1") ||
          row.textContent?.includes("Book 2")
        ) {
          const cells = row.querySelectorAll("td");
          // Days to finish is the second-to-last cell
          expect(cells[cells.length - 2].textContent).toBe("");
        }
      });
    });
  });

  it("renders a list of books with pagesPerDayGoal and daysToFinish when present", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              _id: "3",
              title: "Book 3",
              author: "Author 3",
              pageCount: 300,
              pagesPerDayGoal: 30,
              daysToFinish: 10,
            },
            {
              _id: "4",
              title: "Book 4",
              author: "Author 4",
              pageCount: 400,
              // no pagesPerDayGoal or daysToFinish
            },
          ]),
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList apiUrl="http://localhost:3030" />);

    await waitFor(() => {
      expect(screen.getByText("Book 3")).toBeInTheDocument();
      expect(screen.getByText("Author 3")).toBeInTheDocument();
      expect(screen.getByText("300")).toBeInTheDocument();
      expect(screen.getByText("30")).toBeInTheDocument(); // pagesPerDayGoal present
      expect(screen.getByText("10")).toBeInTheDocument(); // daysToFinish present

      expect(screen.getByText("Book 4")).toBeInTheDocument();
      expect(screen.getByText("Author 4")).toBeInTheDocument();
      expect(screen.getByText("400")).toBeInTheDocument();

      // Book 4: pagesPerDayGoal and daysToFinish cells should be empty
      const rows = screen.getAllByRole("row");
      const book4Row = rows.find((row) => row.textContent?.includes("Book 4"));
      if (book4Row) {
        const cells = book4Row.querySelectorAll("td");
        expect(cells[3].textContent).toBe(""); // pagesPerDayGoal
        expect(cells[4].textContent).toBe(""); // daysToFinish
      }

      // Edit icons
      expect(
        screen.getAllByRole("button", { name: /edit book/i })
      ).toHaveLength(2);
    });
  });

  it("renders BookForm with initialBook when edit icon is clicked", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              _id: "5",
              title: "Book 5",
              author: "Author 5",
              pageCount: 500,
              pagesPerDayGoal: 50,
              daysToFinish: 20,
            },
          ]),
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList apiUrl="http://localhost:3030" />);

    // Wait for the table to render
    await waitFor(() => {
      expect(screen.getByText("Book 5")).toBeInTheDocument();
    });

    // Click the edit button
    fireEvent.click(screen.getByRole("button", { name: /edit book/i }));

    // The form should be rendered with the book's data
    expect(screen.getByDisplayValue("Book 5")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Author 5")).toBeInTheDocument();
    expect(screen.getByDisplayValue(500)).toBeInTheDocument();
    expect(screen.getByDisplayValue(50)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Edit book/i })
    ).toBeInTheDocument();
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
