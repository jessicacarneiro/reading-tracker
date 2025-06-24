import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import Book from "../interfaces/Book";

interface BookFormProps {
  onEditBook: (book: Book) => Promise<void>;
  buttonTitle: string;
  initialBook?: Book;
}

const BookForm: React.FC<BookFormProps> = ({ onEditBook: onAddBook, buttonTitle, initialBook }) => {
  const [form, setForm] = useState<Book>(
    initialBook || { title: "", author: "", pageCount: 0, pagesPerDayGoal: undefined }
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onAddBook(form);
      setForm({ title: "", author: "", pageCount: 0, pagesPerDayGoal: undefined });
    } catch (err: any) {
      setError("Failed to add book.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <Label htmlFor="title" text="Title" className="form-label" />
        <Input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="author" text="Author" className="form-label" />
        <Input
          id="author"
          type="text"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="pageCount" text="Page Count" className="form-label" />
        <Input
          id="pageCount"
          type="number"
          value={form.pageCount}
          onChange={(e) => setForm({ ...form, pageCount: Number(e.target.value) })}
          min={1}
          required
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="pagesPerDayGoal" text="Pages per day goal" className="form-label" />
        <Input
          id="pagesPerDayGoal"
          type="number"
          value={form.pagesPerDayGoal === undefined ? "" : form.pagesPerDayGoal}
          onChange={(e) =>
            setForm({
              ...form,
              pagesPerDayGoal: e.target.value === "" ? undefined : Number(e.target.value),
            })
          }
          min={1}
          required={false}
        />
      </div>
      <Button title={buttonTitle} />
    </form>
  );
};

export default BookForm;