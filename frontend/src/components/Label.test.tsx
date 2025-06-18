import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label component', () => {
  it('renders the correct text', () => {
    render(<Label htmlFor="test-input" text="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies the correct htmlFor attribute', () => {
    render(<Label htmlFor="test-input" text="Test Label" />);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('applies the default and custom class names', () => {
    render(<Label htmlFor="test-input" text="Test Label" className="custom-class" />);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveClass('form-label');
    expect(labelElement).toHaveClass('custom-class');
  });

  it('renders with only default class if no custom class is provided', () => {
    render(<Label htmlFor="test-input" text="Test Label" />);
    
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveClass('form-label');
  });
});