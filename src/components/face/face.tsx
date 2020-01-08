import React, {FunctionComponent} from 'react';
import { observer } from 'mobx-react';
import './face.scss';

type FaceProps = {
  win: boolean;
  gameOver: boolean;
  handleClick?: () => {};
}

const Face: FunctionComponent<FaceProps> = ({ win, gameOver, handleClick }) => {
  return (<div onClick={handleClick} className={`face${win ? ' face--win': ''}${gameOver ? ' face--game-over' : ''}`} />)
};

export default observer(Face);
