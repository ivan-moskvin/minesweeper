import React from 'react';
import { render } from '@testing-library/react';
import Block from './block';

test('renders block', () => {
  const { container } = render(<Block minesCount={15} opened={false} marked={true} state={null} />);
  expect(container.firstChild).toHaveClass('marked');
});
