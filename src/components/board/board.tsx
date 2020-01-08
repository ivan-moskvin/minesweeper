import React from 'react';
import {observer} from 'mobx-react';
import Block from '../block/block';
import Face from '../face/face';
import './board.scss';
import {useStores} from '../../stores';
import {IBlock} from '../../types/IBlock';
import useKeyPress from '../../hooks/use-key-press';
import Counter from '../counter/counter';

const Board = () => {
  const isControlKeyPressed = useKeyPress('Shift');
  const {AppStore} = useStores();
  const {minesCount, time, field, checkClosedBlock, restartGame, setMarkingState} = AppStore;

  setMarkingState(isControlKeyPressed);

  return (
    <div className='board'>
      <div className='field'>
        <div className='board__header-row'>
          <Counter count={minesCount} />
          <Face handleClick={restartGame} />
          <Counter count={time / 1000} />
        </div>
        <div className='frame'>
          {
            field.map((row: [], i: number) =>
              <div className='row' key={i}>
                {
                  row.map((block: IBlock, j: number) =>
                    <Block handleClick={() => checkClosedBlock(i, j)} block={block} key={j} />
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default observer(Board);
