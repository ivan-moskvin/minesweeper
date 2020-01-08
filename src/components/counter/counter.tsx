import React from 'react';
import './counter.scss';

type CounterProps = {
  count: number;
  digits?: number;
}

const Counter: React.FunctionComponent<CounterProps> = ({ digits= 3, count }) => {
  const stringNumber = '' + count;
  return (<div className='counter'>{stringNumber.padStart(digits, '0')}</div>);
};

export default Counter;
