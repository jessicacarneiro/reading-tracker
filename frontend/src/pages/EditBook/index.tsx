import BookForm from "../../components/BookForm";
import handleAddBook from "../../hooks/handleABook";
import Book from "../../interfaces/Book";

const EditBookPage = ({ initialBook }: { initialBook: Book }) => (
  <BookForm onEditBook={handleAddBook} buttonTitle="Edit book" initialBook={initialBook} />
);

export default EditBookPage;