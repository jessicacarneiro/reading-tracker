import BookForm from "../../components/BookForm";
import handleAddBook from "../../hooks/handleABook";

const AddBookPage = () => (
  <BookForm onEditBook={handleAddBook} buttonTitle="Add book" />
);

export default AddBookPage;