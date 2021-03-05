import { render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from './header';

test('renders learn react link', () => {
  render(<Header />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
