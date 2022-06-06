import React from 'react';
import './info.scss';
import {LANG} from "../../lang";

const Info = () => <div className='info'>
  <div className='info__row'>
    <span className='info__pkm' /><span className='info__desc'>— {LANG.MARK_CELL}</span>
  </div>
  <div className='info__row'>
    <strong>Shift + </strong><span className='info__lkm' /><span className='info__desc'> — {LANG.OPEN_NUMBER}</span>
  </div>
  <div className='info__row'>
    <a href="https://github.com/ivan-moskvin/minesweeper" target="_blank">Source code</a>
  </div>
</div>;

export default Info;
