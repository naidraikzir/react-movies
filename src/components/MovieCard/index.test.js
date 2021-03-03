import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'test-utils';
import MovieCard from '.';

const props = {
  Title: 'Title',
};

test('match snapshot', () => {
  const { container } = render(<MovieCard {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders title', () => {
  const { getByText } = render(<MovieCard {...props} />);
  expect(getByText(props.Title)).toBeInTheDocument();
});

test('call props onPosterClick on poster click', () => {
  const mockPosterClick = jest.fn();
  const { getByAltText } = render(<MovieCard
    {...props}
    onPosterClick={mockPosterClick}
  />);
  userEvent.click(getByAltText(props.Title));
  expect(mockPosterClick).toHaveBeenCalled();
});

test('call props onTitleClick on title click', () => {
  const mockTitleClick = jest.fn();
  const { getByText } = render(<MovieCard
    {...props}
    onTitleClick={mockTitleClick}
  />);
  userEvent.click(getByText(props.Title));
  expect(mockTitleClick).toHaveBeenCalled();
});
