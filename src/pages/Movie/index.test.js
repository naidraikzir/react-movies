import React from 'react';
import { MemoryRouter } from 'react-router';
import { act } from '@testing-library/react';
import { render } from 'test-utils';
import { fetchMovie } from 'api';
import Movie from '.';

jest.mock('api');

test('match snapshot', async () => {
  fetchMovie.mockResolvedValueOnce({});
  let container;
  await act(async () => {
    const rendered = render(<MemoryRouter>
      <Movie />
    </MemoryRouter>);
    container = rendered.container;
  });
  expect(await container.firstChild).toMatchSnapshot();
});

test('renders error', async () => {
  const mockErrorMessage = 'error';
  fetchMovie.mockResolvedValueOnce({ Error: mockErrorMessage });
  let rendered;
  await act(async () => {
    rendered = render(<MemoryRouter>
      <Movie />
    </MemoryRouter>);
  });
  expect(await rendered.getByText(mockErrorMessage)).toBeInTheDocument();
});
