import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const apiUrl = process.env.BACKEND_URL || "http://localhost:3030";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState<number>(0);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding a new book...");

    await fetch(`${apiUrl}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, pageCount }),
    });

    // Optionally reset the form
    setTitle("");
    setAuthor("");
    setPageCount(0);
  };

  return (
    <form onSubmit={handleAddBook}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          id="author"
          className="form-control"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="pageCount" className="form-label">
          Page Count
        </label>
        <input
          id="pageCount"
          className="form-control"
          type="number"
          value={pageCount}
          onChange={(e) => setPageCount(Number(e.target.value))}
          min={1}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Book
      </button>
    </form>
  );
}

export default App;
