import {action, observable} from 'mobx';
import {IBlock} from "../types/IBlock";
import {DifficultyEnum, DifficultyLevel} from '../ enums';
import {persist} from 'mobx-persist';

const clearBlock: IBlock = {opened: false, state: 'empty', marked: false};

class AppStore {
  @persist('object') @observable difficulty: DifficultyLevel = DifficultyEnum.intermediate;
  @persist('list') @observable field: any[] = [];
  @persist @observable gameOver: boolean = false;
  @persist @observable shiftMode: boolean = false;
  @persist @observable win: boolean = false;
  @persist @observable gameStarted: boolean = false;
  @persist @observable minesCount: number = 0;
  @persist @observable time: number = 0;
  @persist @observable startTimeout: any;

  @action.bound
  setDifficulty(difficulty: string = 'beginner') {
    this.difficulty = DifficultyEnum[difficulty];
    this.restartGame();
  }

  @action.bound
  setShiftState(state: boolean) {
    this.shiftMode = state;
  }

  @action.bound
  generateField() {
    const {difficulty: {cols, rows}, field} = this;
    for (let i = 0; i < rows; i++) {
      field.push([]);
      for (let j = 0; j < cols; j++) {
        field[i].push(clearBlock);
      }
    }
  }

  @action.bound
  placeMines() {
    const {difficulty: {mines, rows, cols}, field} = this;
    for (let i = 0; i < mines; i++) {
      const [randomRow, randomCol] = getClearCoords();

      this.field[randomRow][randomCol].state = 'mine';
    }

    function getClearCoords(): [number, number] {
      let x = AppStore.getRandomInt(rows);
      let y = AppStore.getRandomInt(cols);
      while (field[x][y].state != 'empty') {
        x = AppStore.getRandomInt(rows);
        y = AppStore.getRandomInt(cols);
      }
      return [x, y]
    }
  }

  @action.bound
  placeNumbers() {
    const {difficulty: {cols, rows}, field} = this;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
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
    const {difficulty: {cols, rows}, field} = this;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        field[i][j].opened = true;
      }
    }
  }

  @action.bound
  restartGame() {
    this.gameOver = false;
    this.win = false;
    this.time = 0;
    this.minesCount = this.difficulty.mines;
    this.field = [];
    this.gameStarted = false;
    clearInterval(this.startTimeout);
    this.generateField();
    this.placeMines();
    this.placeNumbers();
  }

  @action.bound
  startTimer() {
    this.startTimeout = setInterval(() => {
      this.time += 1000;
    }, 1000);
  }

  @action.bound
  checkClosedBlock(i: number, j: number) {
    // После победы нет смысла отмечать ячейки
    if (this.win) {
      return
    }

    if (!this.gameStarted) {
      this.gameStarted = true;
      this.startTimer();
    }

    const {field, shiftMode, openField, setGameOver, checkWin} = this;
    const currentField = field[i][j];

    // Если не в режиме маркировки
    if (!shiftMode) {
      // Если промаркировано миной или открыто, то не даём нажать
      if (
        currentField.opened
        || (currentField.marked && !shiftMode)) {
        return;
      }

      tryToOpen(i, j);
    } else {
      // В режиме маркировки можно открыть
      // все оставшиеся по цифре и количеству соседних мин
      if (
        currentField.opened
        && currentField.state === 'closeToMine'
        && haveEnoughMarkedAround(i, j)
      ) {
        openRest(i, j);

        return;
      }

      // Нельзя маркировать пустые ячейки
      if (currentField.opened) return;

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
        currentField.state = 'destroyed';
        return;
      }

      openRecursive(i, j);
      checkWin();
    }

    /**
     * В окрестностях есть достаточное количество отмеченных флажком мин
     * @param i
     * @param j
     */
    function haveEnoughMarkedAround(i: number, j: number): boolean {
      let count = 0;
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
        if (currentField && currentField.marked) {
          count++;
        }
      });

      return field[i][j].minesCount === count;
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

  @action.bound
  markBlock(i: number, j: number) {
    const { field } = this;
    const currentField = field[i][j];

    if(currentField.opened) {
      return;
    }

    currentField.marked = !currentField.marked;

    if (currentField.marked) {
      this.minesCount--;
    } else {
      this.minesCount++;
    }

    this.checkWin();
  }

  @action.bound
  setGameOver(state: boolean) {
    this.gameOver = state;
    if (state) {
      clearInterval(this.startTimeout);
    }
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }


  noClosedFieldsLeft = () => {
    const {difficulty: {cols, rows}, field} = this;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
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
