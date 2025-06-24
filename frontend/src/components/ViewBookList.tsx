import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import Book from "../interfaces/Book";

const ViewBookList: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl}/books`);
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [apiUrl]);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  // EDIT HANDLER: Calls PUT /books/:id
  const handleUpdateBook = async (book: Book) => {
    if (!book._id) return;
    const {_id, ...bookData} = book; // Exclude _id from the book data
    await fetch(`${apiUrl}/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });
    setEditingBook(null);
    // Optionally refresh the list
    const response = await fetch(`${apiUrl}/books`);
    setBooks(await response.json());
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (books.length === 0) return <div>No books found.</div>;

  if (editingBook) {
    return (
      <BookForm
        onAddBook={handleUpdateBook}
        buttonTitle="Edit book"
        initialBook={editingBook}
      />
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Page Count</th>
          <th>Pages/Day Goal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.pageCount}</td>
            <td>
              {book.pagesPerDayGoal !== undefined && book.pagesPerDayGoal !== null
                ? book.pagesPerDayGoal
                : ""}
            </td>
            <td>
              <button
                className="btn btn-outline-secondary btn-sm"
                title="Edit book"
                aria-label="Edit book"
                onClick={() => handleEdit(book)}
              >
                <span role="img" aria-label="edit">
                  ✏️
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewBookList;