import React from 'react';
import { render } from '@testing-library/react';
import Block from './Block';

test('renders block', () => {
  const { container } = render(<Block block={{ state: 0}} />);
  expect(container.firstChild).toHaveClass('block');
});
