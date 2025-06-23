import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows the book list by default", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/No books found/i)).toBeInTheDocument();
    });
  });

  it('renders form fields after clicking "Add a new book"', () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Add a new book/i }));

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Page Count/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Book/i })
    ).toBeInTheDocument();
  });

  it('shows the book list after clicking "Show all books"', async () => {
    render(<App />);
    // Switch to form first
    fireEvent.click(screen.getByRole("button", { name: /Add a new book/i }));
    // Then back to list
    fireEvent.click(screen.getByRole("button", { name: /Show all books/i }));

    await waitFor(() => {
      expect(screen.getByText(/No books found/i)).toBeInTheDocument();
    });
  });

  it("submits form with correct data", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Add a new book/i }));

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Page Count/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Book/i }));

    await waitFor(() => {
      // Find the POST call
      const postCall = (fetch as jest.Mock).mock.calls.find(
        ([url, options]) =>
          typeof options === "object" &&
          options?.method === "POST" &&
          url.includes("/books")
      );
      expect(postCall).toBeTruthy();

      const [calledUrl, calledOptions] = postCall!;
      expect(calledUrl).toEqual(expect.stringContaining("/books"));
      expect(calledOptions).toMatchObject({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Title",
          author: "Test Author",
          pageCount: 123,
        }),
      });
    });
  });

  it("clears the form after successful submission", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Add a new book/i }));

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Page Count/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Book/i }));

    await waitFor(() => {
      // Find the POST call
      const postCall = (fetch as jest.Mock).mock.calls.find(
        ([url, options]) =>
          typeof options === "object" &&
          options?.method === "POST" &&
          url.includes("/books")
      );
      expect(postCall).toBeTruthy();
    });

    expect(screen.getByLabelText(/Title/i)).toHaveValue("");
    expect(screen.getByLabelText(/Author/i)).toHaveValue("");
    expect(screen.getByLabelText(/Page Count/i)).toHaveValue(0);
  });
});
