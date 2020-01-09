import React from 'react';
import {observer} from 'mobx-react';
import Block from '../block/block';
import Face from '../face/face';
import './board.scss';
import {useStores} from '../../stores';
import {IBlock} from '../../types/IBlock';
import useKeyPress from '../../hooks/use-key-press';
import Counter from '../counter/counter';
import Difficulty from '../difficulty/difficulty';

const Board = () => {
  const isControlKeyPressed = useKeyPress('Shift');
  const {AppStore} = useStores();
  const {
    minesCount,
    time,
    field,
    win,
    gameOver,
    difficulty,
    checkClosedBlock,
    restartGame,
    setMarkingState,
    setDifficulty
  } = AppStore;

  setMarkingState(isControlKeyPressed);

  return (
    <div className='board'>
      <div className='field'>
        <div className='board__header-row'>
          <Counter count={minesCount} />
          <Face
            win={win}
            gameOver={gameOver}
            handleClick={restartGame}
          />
          <Counter count={time / 1000} />
        </div>
        <div className='frame'>
          {
            field.map((row: [], i: number) =>
              <div className='row' key={i}>
                {
                  row.map((block: IBlock, j: number) => {
                    const {state, opened, marked, minesCount = 0} = block;
                    return (<Block
                      handleClick={() => checkClosedBlock(i, j)}
                      state={state}
                      opened={opened}
                      marked={marked}
                      minesCount={minesCount}
                      key={j}
                    />)
                  })
                }
              </div>
            )
          }
        </div>
        <Difficulty
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </div>
    </div>
  )
};

export default observer(Board);
