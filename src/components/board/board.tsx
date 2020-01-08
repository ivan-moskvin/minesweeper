import React from 'react';
import {observer} from 'mobx-react';
import Block from '../block/block';
import './board.scss';
import {useStores} from "../../stores";
import {IBlock} from "../../types/IBlock";

const Board = () => {
  const {AppStore} = useStores();
  const {field} = AppStore;

  return (
    <div className='board'>
    <div className='frame'>
      {
        field.map((row: [], i: number) =>
          <div className='row' key={i}>
            {
              row.map((block: IBlock, j: number) =>
                <Block block={block} key={j} />
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
