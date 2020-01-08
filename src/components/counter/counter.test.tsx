import React from 'react';
import { render } from '@testing-library/react';
import Counter from './counter';

test('renders board', () => {
  const { container } = render(<Counter count={3}/>);
  expect(container.getElementsByClassName('counter')[0].innerHTML).toBe('003');
});
