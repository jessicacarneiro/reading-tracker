import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it('renders with correct type and value', () => {
    render(
      <Input
        type="text"
        value="Test value"
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByDisplayValue('Test value');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('applies the given id and name attributes', () => {
    render(
      <Input
        id="test-id"
        name="test-name"
        type="text"
        value=""
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByRole('textbox'); // For type="text", role="textbox"
    expect(inputElement).toHaveAttribute('id', 'test-id');
    expect(inputElement).toHaveAttribute('name', 'test-name');
  });

  it('applies required and min attributes when provided', () => {
    render(
      <Input
        type="number"
        value={5}
        min={1}
        required={true}
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByDisplayValue('5');
    expect(inputElement).toHaveAttribute('min', '1');
    expect(inputElement).toBeRequired();
  });

  it('applies custom class names along with default form-control class', () => {
    render(
      <Input
        type="text"
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    );

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('form-control');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('calls onChange handler when user types', () => {
    const handleChange = jest.fn();

    render(
      <Input
        type="text"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders a number input with correct value', () => {
    render(
      <Input
        type="number"
        value={10}
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByDisplayValue('10');
    expect(inputElement).toHaveAttribute('type', 'number');
  });
});