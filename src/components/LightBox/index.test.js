import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'test-utils';
import LightBox from '.';

const props = {
  image: 'an-image.gif',
};

test('match snapshot', () => {
  const { container } = render(<LightBox {...props} isOpen />);
  expect(container.firstChild).toMatchSnapshot();
});

test('render nothing if isOpen is falsy', () => {
  const { container } = render(<LightBox {...props} />);
  expect(container).toBeEmptyDOMElement();
});

test('render image if isOpen is truthy', () => {
  const { getByAltText } = render(<LightBox
    {...props}
    isOpen
  />);
  expect(getByAltText('Poster')).toBeInTheDocument();
  expect(getByAltText('Poster').src).toContain(props.image);
});
