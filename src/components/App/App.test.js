import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'test-utils';
import App from '.';

test('renders learn react link', () => {
  render(<App />, {
    initialState: {
      movies: [{
        Title: 'Title',
      }],
    },
  });
  const titleElement = screen.getByText(/Title/i);
  expect(titleElement).toBeInTheDocument();
});
