import React from 'react';
import { render } from 'test-utils';
import MovieDescription from '.';

const props = {
  Title: 'Title',
  Year: 2021,
  imdbRating: '10',
  Genre: 'Genre',
  Plot: 'Lorem ipsum',
  Actors: 'John Wick',
};

test('match snapshot', () => {
  const { container } = render(<MovieDescription {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders description properties', () => {
  const { getByText } = render(<MovieDescription {...props} />);
  expect(getByText(props.Title)).toBeInTheDocument();
  expect(getByText(props.Year)).toBeInTheDocument();
  expect(getByText(props.imdbRating)).toBeInTheDocument();
  expect(getByText(props.Genre)).toBeInTheDocument();
  expect(getByText(props.Plot)).toBeInTheDocument();
  expect(getByText(`Stars: ${props.Actors}`)).toBeInTheDocument();
});
