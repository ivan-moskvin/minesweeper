import React from 'react';
import { render } from '@testing-library/react';
import Block from './Block';

test('renders block', () => {
  const { container } = render(<Block />);
  expect(container.firstChild).toHaveClass('block');
});
