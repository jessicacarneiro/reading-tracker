import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App component - Add Book Form', () => {
  beforeEach(() => {
    // Mock the global fetch function to simulate API calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders form fields', () => {
    render(<App />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Page Count/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Book/i })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<App />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const expectedUrl = expect.stringContaining('/books');
    const expectedPayload = JSON.stringify({
      title: 'Test Title',
      author: 'Test Author',
      pageCount: 123,
    });

    expect(fetch).toHaveBeenCalledWith(expectedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expectedPayload,
    });
  });

  it('clears the form after successful submission', async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText(/Page Count/i), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Book/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByLabelText(/Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Author/i)).toHaveValue('');
    expect(screen.getByLabelText(/Page Count/i)).toHaveValue(0);
  });
});