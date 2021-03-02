import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'test-utils';
import App from '.';

test('renders learn react link', () => {
  render(<App />, {
    initialState: {
      search: '',
      movies: [{
        Title: 'Title',
      }],
    },
  });
  const linkElement = screen.getByText(/Next/i);
  expect(linkElement).toBeInTheDocument();
});
