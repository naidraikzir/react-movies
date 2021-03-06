import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from 'test-utils';
import SearchBox from '.';

const mockOnInput = jest.fn();

test('match snapshot', () => {
  const { container } = render(<SearchBox onInput={mockOnInput} />);
  expect(container.firstChild).toMatchSnapshot();
});

test('calls onEnter prop when user press enter in the input', () => {
  const mockOnEnter = jest.fn();
  const { container } = render(<SearchBox
    onEnter={mockOnEnter}
    onInput={mockOnInput}
  />);
  fireEvent.keyUp(container.querySelector('[name="search"]'), { key: 'Enter' });
  expect(mockOnEnter).toHaveBeenCalled();
});

test('renders reset button if has value', () => {
  const { container } = render(<SearchBox
    value="search..."
    onInput={mockOnInput}
  />);
  expect(container.getElementsByTagName('button')).toHaveLength(1);
});

test('not render reset button if has no value', () => {
  const { container } = render(<SearchBox onInput={mockOnInput} />);
  expect(container.getElementsByTagName('button')).toHaveLength(0);
});

test('calls onReset on reset button clicked', () => {
  const mockOnReset = jest.fn();
  const { container } = render(<SearchBox
    value="search"
    onInput={mockOnInput}
    onReset={mockOnReset}
  />);
  fireEvent.click(container.getElementsByTagName('button')[0]);
  expect(mockOnReset).toHaveBeenCalled();
});
