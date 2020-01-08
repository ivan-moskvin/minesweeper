import React from 'react';
import './block.scss';
import {IBlock} from "../../types/IBlock";

type BlockProps = {
  block: IBlock
}

const Block: React.FunctionComponent<BlockProps> = ({ block }) => {
  const { state, opened, minesCount = 0 } = block;

  return (
    <div className={`block ${opened ? `opened ${state} ${convertToWords(minesCount)}` : 'closed'}`}>
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

export default Block;
