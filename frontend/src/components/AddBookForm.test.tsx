import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddBookForm from './AddBookForm';

describe('AddBookForm component', () => {
  let onAddBook: jest.Mock;

  beforeEach(() => {
    onAddBook = jest.fn(() => Promise.resolve());
  });

  it('renders form fields', () => {
    render(<AddBookForm onAddBook={onAddBook} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Page Count/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Book/i })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<AddBookForm onAddBook={onAddBook} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));

    await waitFor(() => {
      expect(onAddBook).toHaveBeenCalledTimes(1);
    });

    expect(onAddBook).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      pageCount: 123,
    });
  });

  it('clears the form after successful submission', async () => {
    render(<AddBookForm onAddBook={onAddBook} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));

    await waitFor(() => {
      expect(onAddBook).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByLabelText(/Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Author/i)).toHaveValue('');
    expect(screen.getByLabelText(/Page Count/i)).toHaveValue(0);
  });
});