import React, { useEffect, useState } from "react";

const apiUrl = process.env.BACKEND_URL || "http://localhost:3030";

interface Book {
  title: string;
  author: string;
  pageCount: number;
}

const ViewBookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (books.length === 0) return <div>No books found.</div>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Page Count</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, idx) => (
          <tr key={idx}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.pageCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewBookList;