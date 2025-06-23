import { render, screen, waitFor } from "@testing-library/react";
import ViewBookList from "./ViewBookList";

describe("ViewBookList component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("shows loading initially", () => {
    render(<ViewBookList />);
    expect(screen.getByText(/Loading books/i)).toBeInTheDocument();
  });

  it("renders a list of books after fetch", async () => {
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

    render(<ViewBookList />);

    await waitFor(() => {
      expect(screen.getByText("Book 1")).toBeInTheDocument();
      expect(screen.getByText("Book 2")).toBeInTheDocument();
      expect(screen.getByText("Author 1")).toBeInTheDocument();
      expect(screen.getByText("Author 2")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
    });
  });

  it("shows 'No books found.' if the list is empty", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    ) as jest.Mock;

    render(<ViewBookList />);
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

    render(<ViewBookList />);
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});
