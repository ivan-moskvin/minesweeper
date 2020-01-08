import {action, observable} from 'mobx';

class AppStore {
  COLS = 20;
  ROWS = 20;
  MAX_MINES = 20;

  @observable field: any[] = [];

  @action.bound
  generateField() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      field.push([]);
      for (let j = 0; j < COLS; j++) {
        field[i].push({opened: true, state: 'empty'})
      }
    }
  }

  @action.bound
  placeMines() {
    const {MAX_MINES, ROWS, COLS, field} = this;
    for (let i = 0; i < MAX_MINES; i++) {
      const [randomRow, randomCol] = getClearCoords();

      this.field[randomRow][randomCol].state = 'mine';
    }

    function getClearCoords(): [number, number] {
      let x = AppStore.getRandomInt(ROWS);
      let y = AppStore.getRandomInt(COLS);
      while(field[x][y].state != 'empty') {
        x = AppStore.getRandomInt(ROWS);
        y = AppStore.getRandomInt(COLS);
      }
      return [x, y]
    }
  }

  @action.bound
  placeNumbers() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if(field[i][j].state === 'mine') continue;
        field[i][j].minesCount = countMines(i, j);
        if(field[i][j].minesCount > 0) {
          field[i][j].state = 'closeToMine';
        }
      }
    }

    function countMines(i: number, j: number): number {
      let count = 0;
      const coords = [
        [i - 1, j - 1],
        [i, j - 1],
        [i + 1, j - 1],
        [i - 1, j],
        [i, j],
        [i + 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
      ];

      coords.forEach(([i, j]) => {
        if(field?.[i]?.[j]) {
          if(field[i][j].state === 'mine') {
            count++;
          }
        }
      });

      return count;
    }
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  constructor() {
    this.generateField();
    this.placeMines();
    this.placeNumbers();
  }
}

export default new AppStore();
