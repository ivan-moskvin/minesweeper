import {action, observable, toJS} from 'mobx';
import {IBlock} from '../types/IBlock';

interface Row extends Array<{}> {
  [id: number]: IBlock[];
}

class AppStore {
  COLS = 20;
  ROWS = 20;

  @observable field: Row[] = [];

  @action.bound
  generateField() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      field.push([]);
      for (let j = 0; j < COLS; j++) {
        field[i].push({
          state: getRandomInt(2) ? 'empty' : 'mine'
        })
      }
    }

    console.log(toJS(this.field));

    function getRandomInt(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }

  constructor() {
    this.generateField();
  }
}

export default new AppStore();
