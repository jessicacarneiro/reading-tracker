import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the Add Book button with correct title and href', () => {
    render(<App />);
    const button = screen.getByRole('link', { name: 'Add Book' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '#');
  });
});