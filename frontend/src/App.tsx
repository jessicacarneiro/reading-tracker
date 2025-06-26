import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewBookList from "./components/ViewBookList";
import AddBookPage from "./pages/AddBook"; 

export const apiUrl = process.env.BACKEND_URL || "http://localhost:3030";

function App() {
  const [view, setView] = useState<"list" | "add">("list");

  const handleAddBook = async (book: { title: string; author: string; pageCount: number }) => {
    console.log("Adding a new book...");

    await fetch(`${apiUrl}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    console.log("Book added successfully:", book);
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setView("list")}
        >
          Show all books
        </button>
        <button
          className="btn btn-success"
          onClick={() => setView("add")}
        >
          Add a new book
        </button>
      </div>
      {view === "add" && <AddBookPage />}
      {view === "list" && <ViewBookList apiUrl={apiUrl} />}
    </div>
  );
}

export default App;