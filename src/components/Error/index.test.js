import React from 'react';
import { render } from 'test-utils';
import Error from '.';

const props = {
  error: 'Whoops!',
};

test('match snapshot', () => {
  const { container } = render(<Error {...props} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders error message', () => {
  const { getByText } = render(<Error {...props} />);
  expect(getByText(props.error)).toBeInTheDocument();
});
