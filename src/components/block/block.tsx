import React from 'react';
import {observer} from 'mobx-react';
import './block.scss';
import {IBlock} from "../../types/IBlock";

type BlockProps = {
  block: IBlock;
  handleClick: () => {};
}

const Block: React.FunctionComponent<BlockProps> = ({
                                                      handleClick, block
                                                    }) => {
  const {state, opened, marked, minesCount = 0} = block;

  return (
    <div
      onClick={handleClick}
      className={`block${marked ? ' marked' : ''} ${opened ? `opened ${state} ${convertToWords(minesCount)}` : 'closed'}`}>
      {opened && minesCount > 0 && minesCount}
    </div>
  );

  function convertToWords(count: number): string {
    const hash: { [id: number]: string } = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
    };

    return hash?.[count] ?? 'zero';
  }
};

export default observer(Block);
