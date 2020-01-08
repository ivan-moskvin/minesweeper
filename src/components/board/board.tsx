import React from 'react';
import Block from '../block/block';
import './board.css';

const cols = 20;
const rows = 20;

const Board = () => {
  return (
    <div className='board'>
      {[...Array(cols)].map(() => {
        return <div className='row'>{[...Array(rows)].map(() => {
          return <Block />
        })}</div>
      })}
    </div>
  )
};

export default Board;
