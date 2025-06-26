import { apiUrl } from "../App";
import Book from "../interfaces/Book";

export default async function handleAddBook(book: Book) {
  console.log("Saving book", book);

  await fetch(`${apiUrl}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });

  console.log("Book saved successfully:", book);
};
