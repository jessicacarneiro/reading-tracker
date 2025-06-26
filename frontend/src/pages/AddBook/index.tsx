import { apiUrl } from "../../App";
import BookForm from "../../components/BookForm";
import Book from "../../interfaces/Book";

const handleAddBook = async (book: Book) => {
  console.log("Adding a new book...");

  await fetch(`${apiUrl}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  console.log("Book added successfully:", book);
};

const AddBookPage = () => (
  <BookForm onEditBook={handleAddBook} buttonTitle="Add book" />
);

export default AddBookPage;