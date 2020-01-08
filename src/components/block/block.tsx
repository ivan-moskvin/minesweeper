import React from 'react';
import './block.scss';
import {IBlock} from "../../types/IBlock";

type BlockProps = {
  block: IBlock
}

const Block: React.FunctionComponent<BlockProps> = ({ block }) => {
  const { state } = block;

  return (
    <div className={`block ${state}`} />
  )
};

export default Block;
