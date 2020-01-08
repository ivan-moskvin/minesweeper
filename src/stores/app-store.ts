import {action, observable, toJS} from 'mobx';
import {IBlock} from "../types/IBlock";

const clearBlock: IBlock = {opened: false, state: 'empty', marked: false};

class AppStore {
  COLS = 16;
  ROWS = 16;
  MAX_MINES = 5;

  @observable field: any[] = [];
  @observable gameOver: boolean = false;
  @observable isMarking: boolean = false;
  @observable win: boolean = false;
  @observable gameStarted: boolean = false;
  @observable minesCount: number = this.MAX_MINES;
  @observable time: number = 0;
  startTimeout: any;

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
    this.win = false;
    this.time = 0;
    this.clearField();
    this.placeMines();
    this.placeNumbers();
  }

  @action.bound
  checkClosedBlock(i: number, j: number) {
    // После победы нет смысла отмечать ячейки
    if (this.win) {
      return
    }

    if(!this.gameStarted) {
      this.gameStarted = true;
      this.startTimeout = setInterval(() => {
        this.time += 1000;
      },1000);
    }

    const {field, isMarking, openField, setGameOver, checkWin} = this;
    const currentField = field[i][j];

    // Если не в режиме маркировки
    if (!isMarking) {
      // Если промаркировано миной или открыто, то не даём нажать
      if (
        currentField.opened
        || (currentField.marked && !isMarking)) {
        return;
      }

      tryToOpen(i, j);
    } else {
      // В режиме маркировки можно открыть
      // все оставшиеся по цифре и количеству соседних мин
      if (
        currentField.state === 'closeToMine'
        && haveMarkedAround(i, j)
      ) {
        openRest(i, j);

        return;
      }

      // Нельзя маркировать пустые ячейки
      if (currentField.opened) return;

      // В режиме маркировки переставляем флажок (вкл/выкл)
      currentField.marked = !currentField.marked;

      if (currentField.marked) {
        this.minesCount--;
      } else {
        this.minesCount++;
      }

      checkWin();
    }

    /**
     * Попытка открыть ячейку
     * @param i
     * @param j
     */
    function tryToOpen(i: number, j: number) {
      const currentField = field[i][j];

      // Нажатие на мину - конец игры
      if (currentField.state === 'mine') {
        openField();
        setGameOver(true);
        return;
      }

      openRecursive(i, j);
      checkWin();
    }

    /**
     * В окрестностях есть отмеченные флажком мины
     * @param i
     * @param j
     */
    function haveMarkedAround(i: number, j: number): boolean {
      return [
        [i - 1, j - 1],
        [i, j - 1],
        [i + 1, j - 1],
        [i - 1, j],
        [i, j],
        [i + 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
      ].some(([k, l]) => {
        const currentField = field?.[k]?.[l];
        return currentField && currentField.marked
      });
    }

    /**
     * Открыть остальные ячейки вокруг данной
     * @param i
     * @param j
     */
    function openRest(i: number, j: number) {
      [
        [i - 1, j - 1],
        [i, j - 1],
        [i + 1, j - 1],
        [i - 1, j],
        [i, j],
        [i + 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
      ].forEach(([k, l]) => {
        const currentField = field?.[k]?.[l];
        if (currentField
          && !currentField.marked
          && !currentField.opened
        ) {
          tryToOpen(k, l);
        }
      });
    }

    /**
     * Рекурсивно открыть ячейку и все смежные, кроме мин
     * @param i
     * @param j
     */
    function openRecursive(i: number, j: number) {
      if (!field?.[i]?.[j]
        || field[i][j].marked
        || field[i][j].opened
        || field[i][j].state === 'mine') {
        return;
      }

      field[i][j].opened = true;

      const nearCoords = [
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

      nearCoords.forEach(([k, l]) => {
        if (i == k && j == l) {
          return;
        }
        if (field?.[i]?.[j].state === 'empty') {
          openRecursive(k, l);
        }
      });
    }
  }

  @action.bound
  setGameOver(state: boolean) {
    this.gameOver = state;
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  @action.bound
  checkWin() {
    if (
      this.minesCount === 0
      && this.noClosedFieldsLeft()
      && !this.gameOver
    ) {
      this.win = true;
      clearInterval(this.startTimeout);

      return;
    }

    this.win = false;
  }

  noClosedFieldsLeft = () => {
    const {COLS, ROWS, field} = this;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!field[i][j].opened
          && !field[i][j].marked) {
          return false;
        }
      }
    }

    return true;
  };

  constructor() {
    this.generateField();
    this.placeMines();
    this.placeNumbers();
  }
}

export default new AppStore();
