import React, {FunctionComponent} from 'react';
import { observer } from 'mobx-react';
import './face.scss';
import {useStores} from "../../stores";

type FaceProps = {
  handleClick: () => {};
}

const Face: FunctionComponent<FaceProps> = ({ handleClick }) => {
  const {AppStore} = useStores();
  const { win, gameOver } = AppStore;
  return (<div onClick={handleClick} className={`face${win ? ' face--win': ''}${gameOver ? ' face--game-over' : ''}`} />)
};

export default observer(Face);
