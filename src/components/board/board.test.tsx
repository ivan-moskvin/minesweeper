import React from 'react';
import { render } from '@testing-library/react';
import Board from './board';
import {Provider} from 'mobx-react';
import {stores} from '../../stores';

test('renders board', () => {
  const { container } = render(<Provider {...stores}><Board /></Provider>);
  expect(container.firstChild).toHaveClass('board');
});
