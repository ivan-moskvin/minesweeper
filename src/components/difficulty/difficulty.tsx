import React, {ChangeEvent} from 'react';
import {DifficultyEnum, DifficultyLevel} from '../../ enums';
import './difficulty.scss';
import Info from '../info/info';

type DifficultyProps = {
  difficulty: DifficultyLevel;
  setDifficulty?: (difficulty: string) => {};
}

const Difficulty: React.FunctionComponent<DifficultyProps> = ({
                                                                difficulty,
                                                                setDifficulty
                                                              }) => {

  function handleChangeDifficulty(e: ChangeEvent<HTMLSelectElement>) {
    setDifficulty?.(e.target.value);
  }

  return (<div className='frame difficulty'>
    <div>
      Сложность:
      <select name='difficulty'
              className='difficulty__select'
              onChange={handleChangeDifficulty}
              value={difficulty.id}>
        {Object.keys(DifficultyEnum).map(_ => {
          return (
            <option
              className='difficulty__item'
              key={DifficultyEnum[_].id}
              value={DifficultyEnum[_].id}>
              {DifficultyEnum[_].name}
            </option>
          );
        })}
      </select>
    </div>
    <Info/>
  </div>);
};

export default Difficulty;
