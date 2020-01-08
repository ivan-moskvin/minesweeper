import React from 'react';
import { render } from '@testing-library/react';
import Board from './board';

test('renders board', () => {
  const { container } = render(<Board />);
  expect(container.firstChild).toHaveClass('board');
});
