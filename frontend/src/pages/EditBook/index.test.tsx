import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditBookPage from "./index";
import Book from "../../interfaces/Book";

const initialBook: Book = {
  _id: "1",
  title: "Initial Title",
  author: "Initial Author",
  pageCount: 111,
  pagesPerDayGoal: 10,
  daysToFinish: 12,
};

describe("EditBook page", () => {
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

  it("renders the form fields with initial values", () => {
    render(<EditBookPage initialBook={initialBook} />);
    expect(screen.getByLabelText(/Title/i)).toHaveValue("Initial Title");
    expect(screen.getByLabelText(/Author/i)).toHaveValue("Initial Author");
    expect(screen.getByLabelText(/Page Count/i)).toHaveValue(111);
    expect(screen.getByLabelText(/Pages per day goal/i)).toHaveValue(10);
    expect(
      screen.getByRole("button", { name: /Edit book/i })
    ).toBeInTheDocument();
  });

  it("submits the form with updated data", async () => {
    render(<EditBookPage initialBook={initialBook} />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Page Count/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Edit book/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/books"),
        expect.objectContaining({
          method: "POST", // Update this to "PUT" if your handler uses PUT for editing
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: "1",
            title: "Test Title",
            author: "Test Author",
            pageCount: 123,
            pagesPerDayGoal: 10,
            daysToFinish: 12
          }),
        })
      );
    });
  });

  it("clears the form after successful submission", async () => {
    render(<EditBookPage initialBook={initialBook} />);

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Page Count/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Edit book/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Title/i)).toHaveValue("");
      expect(screen.getByLabelText(/Author/i)).toHaveValue("");
      expect(screen.getByLabelText(/Page Count/i)).toHaveValue(0);
      expect(screen.getByLabelText(/Pages per day goal/i)).toHaveValue(null);
    });
  });
});