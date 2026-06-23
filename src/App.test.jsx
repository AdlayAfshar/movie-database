import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('./helper/fetchData', () => ({
  fetchData: vi.fn(async () => ({
    genres: [],
    results: [],
  })),
}));

test('renders the movie database sections', () => {
  render(<App />);
  expect(screen.getByText(/Trending/i)).toBeInTheDocument();
  expect(screen.getByText(/Popular Movies/i)).toBeInTheDocument();
  expect(screen.getByText(/Popular TV Shows/i)).toBeInTheDocument();
});
