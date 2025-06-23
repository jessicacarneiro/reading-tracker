import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

interface AddBookFormProps {
  onAddBook: (book: { title: string; author: string; pageCount: number }) => Promise<void>;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddBook({ title, author, pageCount });
    setTitle("");
    setAuthor("");
    setPageCount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <Label htmlFor="title" text="Title" className="form-label" />
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="author" text="Author" className="form-label" />
        <Input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <Label htmlFor="pageCount" text="Page Count" className="form-label" />
        <Input
          id="pageCount"
          type="number"
          value={pageCount}
          onChange={(e) => setPageCount(Number(e.target.value))}
          min={1}
          required
        />
      </div>
      <Button title="Add Book" />
    </form>
  );
};

export default AddBookForm;