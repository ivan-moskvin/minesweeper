import React, {ChangeEvent} from 'react';
import {DifficultyEnum, DifficultyLevel} from '../../ enums';
import './difficulty.scss';

type DifficultyProps = {
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: string) => {};
}

const Difficulty: React.FunctionComponent<DifficultyProps> = ({
                                                                difficulty,
                                                                setDifficulty
                                                              }) => {

  function handleChangeDifficulty(e: ChangeEvent<HTMLSelectElement>) {
    setDifficulty(e.target.value);
  }

  return (<div className='frame difficulty'>
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
  </div>);
};

export default Difficulty;
