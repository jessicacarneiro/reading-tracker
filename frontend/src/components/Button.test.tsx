import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders the correct title and href', () => {
    render(<Button title="Click me" href="https://example.com" />);
    const link = screen.getByRole('link', { name: 'Click me' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});