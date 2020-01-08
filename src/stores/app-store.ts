import {action, observable, toJS} from 'mobx';
import {IBlock} from "../types/IBlock";

const clearBlock: IBlock = {opened: false, state: 'empty', marked: false};

class AppStore {
  COLS = 16;
  ROWS = 16;
  MAX_MINES = 10;

  @observable field: any[] = [];
  @observable gameOver: boolean = false;
  @observable isMarking: boolean = false;

  @action.bound
  setMarkingState(state: boolean) {
    this.isMarking = state;
  }

  @action.bound
  generateField() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      field.push([]);
      for (let j = 0; j < COLS; j++) {
        field[i].push(clearBlock);
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
      while (field[x][y].state != 'empty') {
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
        if (field[i][j].state === 'mine') continue;
        field[i][j].minesCount = countMines(i, j);
        if (field[i][j].minesCount > 0) {
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
        if (field?.[i]?.[j]) {
          if (field[i][j].state === 'mine') {
            count++;
          }
        }
      });

      return count;
    }
  }

  @action.bound
  openField() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        field[i][j].opened = true;
      }
    }
    console.log(toJS(field));
  }

  @action.bound
  clearField() {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        field[i][j] = clearBlock;
      }
    }
  }

  @action.bound
  restartGame() {
    this.gameOver = false;
    this.clearField();
    this.placeMines();
    this.placeNumbers();
  }

  @action.bound
  checkClosedBlock(i: number, j: number) {
    const {field, isMarking} = this;

    if(
      field[i][j].opened
      || (field[i][j].marked && !isMarking)) {
      return;
    }

    if (!isMarking) {
      if (this.field[i][j].state === 'mine') {
        this.openField();
        this.gameOver = true;
        return;
      }

      openRecursive(i, j);
    } else {
      field[i][j].marked = !field[i][j].marked;
    }


    function openRecursive(i: number, j: number) {
      if (!field?.[i]?.[j]
        || field?.[i]?.[j].marked
        || field?.[i]?.[j].opened
        || field?.[i]?.[j]?.state === 'mine') {
        return;
      }

      field[i][j].opened = true;

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

      coords.forEach(([k, l]) => {
        if (i == k && j == l) {
          return;
        }
        if (field?.[i]?.[j].state === 'empty') {
          openRecursive(k, l);
        }
      });
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
