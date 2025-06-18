import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders the correct title and href', () => {
    const title = 'Click me';
    const handleClick = jest.fn();

    render(<Button title={title} onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: title });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    const title = 'Click me';

    render(<Button title={title} onClick={handleClick} />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});