import { describe, expect, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from '../Popup';

describe('Popup Component', () => {
  test('renders without crashing', () => {
    render(<Popup />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('displays initial state correctly', () => {
    render(<Popup />);
    expect(screen.getByText(/FixedPoint/i)).toBeInTheDocument();
  });

  test('handles user input', async () => {
    const user = userEvent.setup();
    render(<Popup />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Test URL');
    
    expect(input).toHaveValue('Test URL');
  });
}); 