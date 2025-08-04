
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByText(/Modern News App/i);
    expect(heading).toBeInTheDocument();
  });
});
