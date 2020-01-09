import React from 'react';
import {observer} from 'mobx-react';
import './block.scss';
import {IBlockState} from "../../types/IBlock";

type BlockProps = {
  opened: boolean;
  marked: boolean;
  minesCount: number;
  state: IBlockState;
  handleLeftClick?: () => {};
  handleRightClick?: () => {};
}

const Block: React.FunctionComponent<BlockProps> = ({
                                                      state,
                                                      opened,
                                                      marked,
                                                      minesCount,
                                                      handleLeftClick,
                                                      handleRightClick
                                                    }) => {


  return (
    <div
      onClick={handleLeftClick}
      onContextMenu={(e) => {
        e.preventDefault();
        handleRightClick?.();
      }}
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
