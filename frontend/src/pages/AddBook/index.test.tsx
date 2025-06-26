import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddBookPage from "./index";

describe("AddBook page", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the form fields", () => {
    render(<AddBookPage />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Page Count/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add book/i })
    ).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
    render(<AddBookPage />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Page Count/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add book/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/books"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Test Title",
            author: "Test Author",
            pageCount: 123,
          }),
        })
      );
    });
  });

  it("clears the form after successful submission", async () => {
    render(<AddBookPage />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Page Count/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add book/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Title/i)).toHaveValue("");
      expect(screen.getByLabelText(/Author/i)).toHaveValue("");
      expect(screen.getByLabelText(/Page Count/i)).toHaveValue(0);
    });
  });
});