import React from 'react';
import { render } from 'test-utils';
import Home from '.';

test('match snapshot', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders error', async () => {
  const mockErrorMessage = 'error';
  const { getByText } = render(<Home />, {
    initialState: {
      error: mockErrorMessage,
    },
  });
  expect(getByText(mockErrorMessage)).toBeInTheDocument();
});
