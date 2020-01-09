import React from 'react';
import { render } from '@testing-library/react';
import Difficulty from './difficulty';
import {DifficultyEnum} from '../../ enums';

test('renders difficulty', () => {
  const { getByDisplayValue } = render(<Difficulty difficulty={DifficultyEnum.beginner} />);
  const selectElement = getByDisplayValue("Новичок") as HTMLSelectElement;
  expect(selectElement.value).toBe('beginner');
});
