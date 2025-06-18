import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders the correct title and href', () => {
    const title = 'Click me';
    const href = '/example';

    render(<Button title={title} href={href} />);

    const linkElement = screen.getByText(title);
    expect(linkElement).toBeInTheDocument();

    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', href);
  });
});