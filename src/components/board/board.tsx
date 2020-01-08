import React from 'react';
import {observer} from 'mobx-react';
import Block from '../block/block';
import Face from '../face/face';
import './board.scss';
import {useStores} from "../../stores";
import {IBlock} from "../../types/IBlock";

const Board = () => {
  const {AppStore} = useStores();
  const {field, checkClosedBlock, restartGame} = AppStore;

  return (
    <div className='board'>
      <Face handleClick={restartGame} />
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
  )
};

export default observer(Board);
