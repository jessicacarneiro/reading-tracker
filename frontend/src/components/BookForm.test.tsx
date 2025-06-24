import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from './BookForm';

describe('AddBookForm component', () => {
  let onAddBook: jest.Mock;

  beforeEach(() => {
    onAddBook = jest.fn(() => Promise.resolve());
  });

  it('renders form fields', () => {
    const buttonTitle = 'Add Book';
    render(<BookForm onEditBook={onAddBook} buttonTitle={buttonTitle} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Page Count/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pages per day goal/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: buttonTitle })).toBeInTheDocument();
  });

  it('submits form with correct mandatory data', async () => {
    const buttonTitle = 'Add Book';
    render(<BookForm onEditBook={onAddBook} buttonTitle={buttonTitle} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: buttonTitle }));

    await waitFor(() => {
      expect(onAddBook).toHaveBeenCalledTimes(1);
    });

    expect(onAddBook).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      pageCount: 123,
    });
  });

  it('submits form with correct data', async () => {
    const buttonTitle = 'Add Book';
    render(<BookForm onEditBook={onAddBook} buttonTitle={buttonTitle} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Pages per day goal/i), { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: buttonTitle }));

    await waitFor(() => {
      expect(onAddBook).toHaveBeenCalledTimes(1);
    });

    expect(onAddBook).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      pageCount: 123,
      pagesPerDayGoal: 5,
    });
  });

  it('clears the form after successful submission', async () => {
    const buttonTitle = 'Add Book';
    render(<BookForm onEditBook={onAddBook} buttonTitle={buttonTitle} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: buttonTitle }));

    await waitFor(() => {
      expect(onAddBook).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByLabelText(/Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Author/i)).toHaveValue('');
    expect(screen.getByLabelText(/Pages per day goal/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Page Count/i)).toHaveValue(0);
  });
});