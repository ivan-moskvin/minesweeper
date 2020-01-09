import React from 'react';
import './info.scss';

const Info = () => <div className='info'>
  <div className='info__row'>
    <span className='info__pkm' /><span className='info__desc'>— пометить ячейку</span>
  </div>
  <div className='info__row'>
    <strong>Shift + </strong><span className='info__lkm' /><span className='info__desc'> — открыть цифру</span>
  </div>
</div>;

export default Info;
