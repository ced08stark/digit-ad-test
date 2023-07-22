import { render, screen } from '@testing-library/react';
import PostView from './pages/PostView';
import React from 'react'

test('renders learn react link', () => {
  render(<PostView />);
  const linkElement = screen.getByText(/post view/i);
  expect(linkElement).toBeInTheDocument();
});
