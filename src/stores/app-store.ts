import {action, observable, toJS} from 'mobx';

class AppStore {
  COLS = 20;
  ROWS = 20;
  MAX_MINES = 10;

  @observable field: any[] = [];

  @action.bound
  generateField() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      field.push([]);
      for (let j = 0; j < COLS; j++) {
        field[i].push({state: null})
      }
    }
  }

  @action.bound
  placeMines() {
    const {MAX_MINES, ROWS, COLS, getRandomInt, field} = this;
    for (let i = 0; i < MAX_MINES; i++) {
      const [randomRow, randomCol] = getClearCoords();

      this.field[randomRow][randomCol].state = 'mine';
    }

    function getClearCoords(): [number, number] {
      let x = getRandomInt(ROWS);
      let y = getRandomInt(COLS);
      while(field[x][y].state != null) {
        x = getRandomInt(ROWS);
        y = getRandomInt(COLS);
      }
      return [x, y]
    }
  }

  @action.bound
  placeNumbers() {

  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor() {
    this.generateField();
    this.placeMines();
    this.placeNumbers();
  }
}

export default new AppStore();
