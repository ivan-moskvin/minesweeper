import React, {FunctionComponent} from 'react';
import { observer } from 'mobx-react';
import './face.scss';
import {useStores} from "../../stores";

type FaceProps = {
  handleClick: () => {};
}

const Face: FunctionComponent<FaceProps> = ({ handleClick }) => {
  const {AppStore} = useStores();
  const { gameOver } = AppStore;
  return (<div onClick={handleClick} className={`face${gameOver ? ' face--game-over' : ''}`} />)
};

export default observer(Face);
