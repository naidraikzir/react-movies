import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'test-utils';
import App from '.';

test('match snapshot', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders a title', () => {
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
