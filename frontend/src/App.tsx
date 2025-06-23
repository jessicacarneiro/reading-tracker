import "bootstrap/dist/css/bootstrap.min.css";
import AddBookForm from "./components/AddBookForm";

const apiUrl = process.env.BACKEND_URL || "http://localhost:3030";

function App() {
  const handleAddBook = async (book: { title: string; author: string; pageCount: number }) => {
    console.log("Adding a new book...");

    await fetch(`${apiUrl}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });

    console.log("Book added successfully:", book);
  };

  return <AddBookForm onAddBook={handleAddBook} />;
}

export default App;