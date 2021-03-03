import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { render } from 'test-utils';
import Navbar from '.';

test('match snapshot', () => {
  const { container } = render(<Navbar />);
  expect(container.firstChild).toMatchSnapshot();
});

test('navigate to root on title click', () => {
  const history = createMemoryHistory();
  const { getByText } = render(<Router
    history={history}
  >
    <Navbar />
  </Router>);
  history.push('/somewhere');
  fireEvent.click(getByText('Movies'));
  expect(history.location.pathname).toEqual('/');
});
