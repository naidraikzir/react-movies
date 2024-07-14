import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'test-utils';
import Home from '.';

test('match snapshot', () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('renders error', async () => {
  const mockErrorMessage = 'error';
  const { getByText } = render((
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  ), {
    initialState: {
      error: mockErrorMessage,
    },
  });
  expect(getByText(mockErrorMessage)).toBeInTheDocument();
});
