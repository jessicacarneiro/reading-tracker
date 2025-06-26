import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookForm from "../../components/BookForm";

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
    render(<BookForm onEditBook={jest.fn()} buttonTitle="Add book" />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Page Count/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add book/i })
    ).toBeInTheDocument();
  });

  it("submits the form with correct data", async () => {
    const handleAddBook = jest.fn(() => Promise.resolve());
    render(<BookForm onEditBook={handleAddBook} buttonTitle="Add book" />);

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
      expect(handleAddBook).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        pageCount: 123,
        pagesPerDayGoal: undefined,
      });
    });
  });

  it("clears the form after successful submission", async () => {
    render(
      <BookForm
        onEditBook={jest.fn(() => Promise.resolve())}
        buttonTitle="Add book"
      />
    );

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
