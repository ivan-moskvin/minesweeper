import React from 'react';
import { render } from '@testing-library/react';
import Face from './face';

test('renders board', () => {
  const { container } = render(<Face win={false} gameOver={true} />);
  expect(container.firstChild).toHaveClass('face--game-over');
});
